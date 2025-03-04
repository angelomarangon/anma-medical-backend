import { Appointment } from '../entities/appointment.entity';


export interface AppointmentRepository {
    save(appointment: Appointment): Promise<Appointment>;
    findById(id: string): Promise<Appointment | null>;
    findAllByDoctor(doctorId: string): Promise <Appointment[]>
    findAllByUser(userId: string): Promise <Appointment[]>
    update(appointment: Appointment): Promise<void>;
    delete(id: string): Promise<void>;
}