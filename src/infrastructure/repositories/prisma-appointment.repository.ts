import { PrismaClient } from "@prisma/client";
import { Appointment, AppointmentRepository, AppointmentStatus, PaymentStatus } from "../../domain";


const prisma = new PrismaClient();

export class PrismaAppointmentRepository implements AppointmentRepository {

    async save(appointment: Appointment): Promise<Appointment> {
        const { id, userId, doctorId, date, time, status, paymentStatus, diagnosis } = appointment;
        const newAppointment = await prisma.appointment.create({
            data: {
                id,
                userId,
                doctorId,
                time,
                date,
                status: status as AppointmentStatus,
                paymentStatus: paymentStatus as PaymentStatus,
                diagnosis
            }
        });

        return new Appointment(
            newAppointment.id,
            newAppointment.userId,
            newAppointment.doctorId,
            newAppointment.date,
            newAppointment.time ?? "00:00",
            newAppointment.status as AppointmentStatus,
            newAppointment.paymentStatus as PaymentStatus,
            newAppointment.diagnosis ?? ""
        );
    }
    async findById(id: string): Promise<Appointment | null> {
        const appointment = await prisma.appointment.findUnique({
            where: { id }
        });

        if (!appointment) return null;

        return new Appointment(
            appointment.id,
            appointment.userId,
            appointment.doctorId,
            appointment.date,
            appointment.time ?? "00:00",
            appointment.status as AppointmentStatus,
            appointment.paymentStatus as PaymentStatus,
            appointment.diagnosis ?? ""
        );
    }

    async findAllByDoctor(doctorId: string): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: { doctorId },
            orderBy: { date: 'asc' } 
        });

        return appointments.map(app => new Appointment(
            app.id,
            app.userId,
            app.doctorId,
            app.date,
            app.time ?? "00:00",
            app.status as AppointmentStatus,
            app.paymentStatus as PaymentStatus,
            app.diagnosis ?? ""
        ));
    }

    async findAllByUser(userId: string): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({
            where: { userId },
            include: { // Incluir la relación con el Doctor
                doctor: {
                    select: {
                        name: true,
                        specialty: true
                    }
                }
            },
            orderBy: { date: 'asc' }
        });
    
        return appointments.map(app => new Appointment(
            app.id,
            app.userId,
            app.doctorId,
            app.date,
            app.time ?? "00:00",
            app.status as AppointmentStatus,
            app.paymentStatus as PaymentStatus,
            app.diagnosis ?? "",
            app.doctor ? { 
                name: app.doctor.name,
                specialty: app.doctor.specialty
            } : undefined
        ));
    
    }

    async update(appointment: Appointment): Promise<void> {
        await prisma.appointment.update({
            where: { id: appointment.id },
            data: {
                status: appointment.status,
                paymentStatus: appointment.paymentStatus,
                diagnosis: appointment.diagnosis
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.appointment.delete({ where: { id } });
    }

}