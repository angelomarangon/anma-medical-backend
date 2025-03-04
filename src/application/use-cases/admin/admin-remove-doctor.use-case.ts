import { AppointmentRepository, DoctorRepository } from "../../../domain";



export class AdminRemoveDoctorUseCase {
    constructor(
        private readonly doctorRepository: DoctorRepository,
        private readonly appointmentRepository: AppointmentRepository,
    ) {}

    async execute(doctorId:string):Promise <void> {
        const doctor = await this.doctorRepository.findById(doctorId);
        if(!doctor) {
            throw new Error('Doctor not found');
        }

        // Eliminar todas las citas asociadas al doctor antes de eliminarlo
        const appointments = await this.appointmentRepository.findAllByDoctor(doctorId)
        for (const appointment of appointments) {
            await this.appointmentRepository.delete(appointment.id);
        }

        await this.doctorRepository.delete(doctorId);
    }
}