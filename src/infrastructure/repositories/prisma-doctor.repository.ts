import { PrismaClient } from "@prisma/client";
import { Doctor, DoctorRepository } from "../../domain";


const prisma = new PrismaClient();

export class PrismaDoctorRepository implements DoctorRepository {
    
    async findAll(): Promise<Doctor[]> {
        const doctors = await prisma.doctor.findMany({
            include: { appointments: { select: { id: true } } } // ✅ Incluir citas si las tiene
        });
    
        return doctors.map(doctor => new Doctor(
            doctor.id,
            doctor.name,
            doctor.email,
            doctor.password,
            doctor.specialty,
            doctor.availableDays,
            doctor.appointments?.map(app => app.id) || [],  // ✅ Convertir citas en un array de IDs
            doctor.role as 'doctor'
        ));
    }
    
    async save(doctor: Doctor): Promise<Doctor> {
        const newDoctor = await prisma.doctor.create({
            data: {
                name: doctor.name,
                email: doctor.email,
                password: doctor.password,
                specialty: doctor.specialty,
                availableDays: doctor.availableDays,
                role: doctor.role     
            }
        });

        const doctorRole = newDoctor.role as 'doctor';

        return new Doctor(
            newDoctor.id,
            newDoctor.name, 
            newDoctor.email, 
            newDoctor.password, 
            newDoctor.specialty, 
            newDoctor.availableDays,
            [], 
            doctorRole
        );
    }

    async findByEmail(email: string): Promise<Doctor | null> {
        const doctor = await prisma.doctor.findUnique({
            where: {email},
            include: { appointments: true } 
        });
        if(!doctor) return null;

        return new Doctor(
            doctor.id,
            doctor.name,
            doctor.email,
            doctor.password,
            doctor.specialty,
            doctor.availableDays,
            doctor.appointments.map(app => app.id),
            doctor.role as 'doctor'
        );
    }

    async findById(id: string): Promise<Doctor | null> {
        const doctor = await prisma.doctor.findUnique({
            where: {id},
            include: { appointments: true } 
        });
        if(!doctor) return null;

        return new Doctor(
            doctor.id,
            doctor.name,
            doctor.email,
            doctor.password,
            doctor.specialty,
            doctor.availableDays,
            doctor.appointments.map(app => app.id),
            doctor.role as 'doctor'
        );
    }


    async update(doctor: Doctor): Promise<void> {
        await prisma.doctor.update({
            where: {id: doctor.id},
            data: {
                name: doctor.name,
                email: doctor.email,
                password: doctor.password,
                specialty: doctor.specialty,
                availableDays: doctor.availableDays,
                role: doctor.role
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.doctor.delete({where: {id}});
    }

}