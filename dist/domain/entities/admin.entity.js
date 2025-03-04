"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
class Admin {
    constructor(id, name, email, role = 'admin') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
    createDoctor(doctor) {
        console.log(`Doctor ${doctor.name} added successfully`);
    }
    deleteDoctor(doctor) {
        console.log(`Doctor ${doctor.name} deleted successfully`);
    }
}
exports.Admin = Admin;
