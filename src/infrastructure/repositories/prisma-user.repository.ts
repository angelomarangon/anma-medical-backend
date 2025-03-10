import { PrismaClient } from "@prisma/client";
import { User, UserRepository } from "../../domain";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                identityNumber: true,
                socialSecurity: true,
                phone: true,
                address: true,
                postalCode: true,
                city: true,
                gender: true,
                birthDate: true,
                bloodType: true
            }
        });

        return users.map(user => new User(
            user.id,
            user.name,
            user.email,
            '', // No devolver la contraseña por seguridad
            user.role as 'user' | 'admin' | 'doctor' | 'receptionist',
            user.identityNumber || undefined,
            user.socialSecurity || undefined,
            user.phone || undefined,
            user.address || undefined,
            user.postalCode || undefined,
            user.city || undefined,
            user.gender || undefined,
            user.birthDate ? new Date(user.birthDate) : undefined,
            user.bloodType || undefined
        ));
    }

    async save(user: User): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                identityNumber: user.identityNumber,
                socialSecurity: user.socialSecurity,
                phone: user.phone,
                address: user.address,
                postalCode: user.postalCode,
                city: user.city,
                gender: user.gender,
                birthDate: user.birthDate,
                bloodType: user.bloodType
            }
        });

        return new User(
            newUser.id,
            newUser.name,
            newUser.email,
            newUser.password,
            newUser.role as 'user' | 'admin' | 'doctor' | 'receptionist',
            newUser.identityNumber || undefined,
            newUser.socialSecurity || undefined,
            newUser.phone || undefined,
            newUser.address || undefined,
            newUser.postalCode || undefined,
            newUser.city || undefined,
            newUser.gender || undefined,
            newUser.birthDate ? new Date(newUser.birthDate) : undefined,
            newUser.bloodType || undefined
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return null;

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role as 'user' | 'admin' | 'doctor' | 'receptionist',
            user.identityNumber || undefined,
            user.socialSecurity || undefined,
            user.phone || undefined,
            user.address || undefined,
            user.postalCode || undefined,
            user.city || undefined,
            user.gender || undefined,
            user.birthDate ? new Date(user.birthDate) : undefined,
            user.bloodType || undefined
        );
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role as 'user' | 'admin' | 'doctor' | 'receptionist',
            user.identityNumber || undefined,
            user.socialSecurity || undefined,
            user.phone || undefined,
            user.address || undefined,
            user.postalCode || undefined,
            user.city || undefined,
            user.gender || undefined,
            user.birthDate ? new Date(user.birthDate) : undefined,
            user.bloodType || undefined
        );
    }

    async update(user: User): Promise<void> {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
                identityNumber: user.identityNumber,
                socialSecurity: user.socialSecurity,
                phone: user.phone,
                address: user.address,
                postalCode: user.postalCode,
                city: user.city,
                gender: user.gender,
                birthDate: user.birthDate,
                bloodType: user.bloodType
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }
}