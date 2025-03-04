import { PrismaClient } from "@prisma/client";
import { User, UserRepository } from "../../domain";




const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository{
    
    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        return users.map(user => new User(
            user.id,
            user.name,
            user.email,
            '', // No devolvemos la contraseña por seguridad
            user.role as 'user' | 'admin' | 'doctor' | 'receptionist'
        ));
    }
    async save(user: User): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role
            }
        });
        const userRole = newUser.role as 'user' | 'admin' | 'doctor' | 'receptionist';

        return new User(
            newUser.id,
            newUser.name,
            newUser.email,
            newUser.password,
            userRole
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({where: {email}});
        if(!user) return null;

        return new User(
            user.id, 
            user.name, 
            user.email, 
            user.password, 
            user.role as 'user' | 'admin' | 'doctor' | 'receptionist'
        );
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({where: {id}});
        if(!user) return null;

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role as 'user' | 'admin' | 'doctor' | 'receptionist'
        );
    }

    async update(user: User): Promise<void> {
        await prisma.user.update({
            where: {id: user.id},
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({where: {id}});
    }
}