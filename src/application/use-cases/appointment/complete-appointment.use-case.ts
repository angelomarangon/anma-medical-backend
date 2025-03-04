import { AppointmentRepository } from "../../../domain";


export class CompleteAppointmentUseCase {
    constructor(
        private readonly appointmentRepository: AppointmentRepository
    ){}

    async execute(appointmentId: string, doctor: {id: string}): Promise<void> {
        const appointment = await this.appointmentRepository.findById(appointmentId);
        if(!appointment){
            throw new Error('Appointment not found');
        }

        if(appointment.doctorId !== doctor.id){
            throw new Error('You are not authorized to complete this appointment');
        }

        appointment.completeAppointment();
        await this.appointmentRepository.update(appointment);

    }
}