"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
class Doctor {
    constructor(id, name, email, password, specialty, availableDays, appointments = [], role = 'doctor') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.specialty = specialty;
        this.availableDays = availableDays;
        this.appointments = appointments;
        this.role = role;
    }
    addAvailableDay(day) {
        if (!this.availableDays.includes(day)) {
            this.availableDays.push(day);
        }
    }
    removeAvailableDay(day) {
        this.availableDays = this.availableDays.filter(d => d !== day);
    }
    changePassword(newPassword) {
        this.password = newPassword;
    }
}
exports.Doctor = Doctor;
