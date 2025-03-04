import { Doctor } from "./doctor.entity";



export class Admin {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public readonly role: 'admin' = 'admin'
    ) {}

    createDoctor(doctor: Doctor) {
        console.log(`Doctor ${doctor.name} added successfully`)
    }
    
    deleteDoctor(doctor: Doctor) {
        console.log(`Doctor ${doctor.name} deleted successfully`)
    }
}