import { Doctor, DoctorRepository } from "../../../domain";


interface Options {
    name: string;
    email: string;
    password: string;
    specialty: string;
    avaiableDays: string[];
}

export class CreateDoctorUseCase {
    constructor(
        private readonly doctorRepository: DoctorRepository,
    ) { }

    async execute(options: Options): Promise<Doctor> {
        const { name, email, password, specialty, avaiableDays } = options;

        const existingDoctor = await this.doctorRepository.findByEmail(email);
        if (existingDoctor) {
            throw new Error('Doctor already exists');
        }

        const newDoctor = new Doctor(
            crypto.randomUUID(),
            name,
            email,
            password,
            specialty,
            avaiableDays,
            [],
            'doctor'
        );

        return this.doctorRepository.save(newDoctor);
    }

}