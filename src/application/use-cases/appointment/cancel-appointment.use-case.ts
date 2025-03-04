import { AppointmentRepository } from "../../../domain";


export class CancelAppointmentUseCase {
    constructor(
        private readonly appointmentRepository: AppointmentRepository
    ){}

    async execute(appointmentId: string, requester: {id: string, role: 'user'}): Promise<void> {
        const appointment = await this.appointmentRepository.findById(appointmentId);
        if(!appointment){
            throw new Error('Appointment not found');
        }

        if( requester.role === 'user' && appointment.userId !== requester.id){
            throw new Error('You are not authorized to cancel this appointment');
        }

        appointment.cancelAppointment();
        await this.appointmentRepository.update(appointment);

    }
}