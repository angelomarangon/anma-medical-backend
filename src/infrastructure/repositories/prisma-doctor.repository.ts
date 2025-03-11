import { PrismaClient } from "@prisma/client";
import { Doctor, DoctorRepository } from "../../domain";

const prisma = new PrismaClient();

export class PrismaDoctorRepository implements DoctorRepository {

    async findAll(): Promise<Doctor[]> {
        const doctors = await prisma.doctor.findMany({
            include: { appointments: { select: { id: true } } }
        });

        return doctors.map(doctor => new Doctor(
            doctor.id,
            doctor.name,
            doctor.email,
            doctor.password,
            doctor.specialty,
            doctor.availableDays,
            doctor.availableHours as { [key: string]: { start: string; end: string }[] }, // ✅ Convertir JSON a objeto
            doctor.identityNumber || undefined,
            doctor.licenseNumber || undefined,
            doctor.phone || undefined,
            doctor.address || undefined,
            doctor.city || undefined,
            doctor.nationality || undefined,
            doctor.gender || undefined,
            doctor.birthDate ? new Date(doctor.birthDate) : undefined,
            doctor.profileImage || undefined,
            doctor.appointments?.map(app => app.id) || [],
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
                availableHours: doctor.availableHours,
                role: doctor.role,

                // ✅ Guardar datos opcionales correctamente
                identityNumber: doctor.identityNumber || null,
                licenseNumber: doctor.licenseNumber || null,
                phone: doctor.phone || null,
                address: doctor.address || null,
                city: doctor.city || null,
                nationality: doctor.nationality || null,
                gender: doctor.gender || null,
                birthDate: doctor.birthDate || null,
                profileImage: doctor.profileImage || null
            }
        });

        return new Doctor(
            newDoctor.id,
            newDoctor.name,
            newDoctor.email,
            newDoctor.password,
            newDoctor.specialty,
            newDoctor.availableDays,
            newDoctor.availableHours as { [key: string]: { start: string; end: string }[] }, // ✅ Convertir JSON a objeto en TS
            newDoctor.identityNumber || undefined,
            newDoctor.licenseNumber || undefined,
            newDoctor.phone || undefined,
            newDoctor.address || undefined,
            newDoctor.city || undefined,
            newDoctor.nationality || undefined,
            newDoctor.gender || undefined,
            newDoctor.birthDate ? new Date(newDoctor.birthDate) : undefined,
            newDoctor.profileImage || undefined,
            [], // ✅ Inicializar lista de citas vacía
            newDoctor.role as 'doctor'
        );
    }

    async findByEmail(email: string): Promise<Doctor | null> {
        const doctor = await prisma.doctor.findUnique({
            where: { email },
            include: { appointments: true }
        });

        if (!doctor) return null;

        return new Doctor(
            doctor.id,
            doctor.name,
            doctor.email,
            doctor.password,
            doctor.specialty,
            doctor.availableDays,
            doctor.availableHours as { [key: string]: { start: string; end: string }[] },
            doctor.identityNumber || undefined,
            doctor.licenseNumber || undefined,
            doctor.phone || undefined,
            doctor.address || undefined,
            doctor.city || undefined,
            doctor.nationality || undefined,
            doctor.gender || undefined,
            doctor.birthDate ? new Date(doctor.birthDate) : undefined,
            doctor.profileImage || undefined,
            doctor.appointments?.map(app => app.id) || [], 
            doctor.role as 'doctor'
        );
    }

    async findById(id: string): Promise<Doctor | null> {
        const doctor = await prisma.doctor.findUnique({
            where: { id },
            include: { appointments: { select: { id: true } } } // ✅ Solo obtener IDs de citas
        });
    
        if (!doctor) return null;
    
        return new Doctor(
            doctor.id,
            doctor.name,
            doctor.email,
            doctor.password,
            doctor.specialty,
            doctor.availableDays,
            doctor.availableHours as { [key: string]: { start: string; end: string }[] },
            doctor.identityNumber || undefined,
            doctor.licenseNumber || undefined,
            doctor.phone || undefined,
            doctor.address || undefined,
            doctor.city || undefined,
            doctor.nationality || undefined,
            doctor.gender || undefined,
            doctor.birthDate ? new Date(doctor.birthDate) : undefined,
            doctor.profileImage || undefined,
            doctor.appointments?.map((app: { id: string }) => app.id) ?? [], // ✅ Solución final aquí
            doctor.role as 'doctor'
        );
    }

    async update(doctor: Doctor): Promise<void> {
        await prisma.doctor.update({
            where: { id: doctor.id },
            data: {
                name: doctor.name,
                email: doctor.email,
                password: doctor.password,
                specialty: doctor.specialty,
                availableDays: doctor.availableDays,
                availableHours: doctor.availableHours,
                role: doctor.role,

                // ✅ Actualizar datos opcionales
                identityNumber: doctor.identityNumber || null,
                licenseNumber: doctor.licenseNumber || null,
                phone: doctor.phone || null,
                address: doctor.address || null,
                city: doctor.city || null,
                nationality: doctor.nationality || null,
                gender: doctor.gender || null,
                birthDate: doctor.birthDate || null,
                profileImage: doctor.profileImage || null
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.doctor.delete({ where: { id } });
    }
}