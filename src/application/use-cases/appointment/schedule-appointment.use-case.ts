import { AppointmentRepository, DoctorRepository, UserRepository } from "../../../domain";
import { Appointment } from '../../../domain/entities/appointment.entity';

interface Options {
    userId: string;
    doctorId: string;
    date: Date;
}

export class ScheduleAppointmentUseCase {
    constructor(
        private readonly appointmentRepository: AppointmentRepository,
        private readonly userRepository: UserRepository,
        private readonly doctorRepository: DoctorRepository
    ){}

    async execute(options: Options): Promise<Appointment> {
        const {userId, doctorId, date} = options

        const user = await this.userRepository.findById(userId);
        if(!user){
            throw new Error('User not found');
        }

        const doctor = await this.doctorRepository.findById(doctorId);
        if(!doctor) {
            throw new Error('Doctor not found');
        }

        const newAppointment = new Appointment(
            crypto.randomUUID(),
            userId,
            doctorId,
            date,
            'scheduled',
            'pending'
        );

        return this.appointmentRepository.save(newAppointment);
    }
}