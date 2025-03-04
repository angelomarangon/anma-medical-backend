import { Doctor } from "../entities/doctor.entity";


export interface DoctorRepository {
    save(doctor: Doctor): Promise<Doctor>;
    findByEmail(email: string): Promise<Doctor | null>;
    findById(id: string): Promise<Doctor | null>;
    findAll(): Promise<Doctor[]>;
    update(doctor: Doctor): Promise<void>;
    delete(id: string): Promise<void>;
}