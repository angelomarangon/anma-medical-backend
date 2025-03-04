"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDoctorRepository = void 0;
const client_1 = require("@prisma/client");
const domain_1 = require("../../domain");
const prisma = new client_1.PrismaClient();
class PrismaDoctorRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const doctors = yield prisma.doctor.findMany({
                include: { appointments: { select: { id: true } } } // ✅ Incluir citas si las tiene
            });
            return doctors.map(doctor => {
                var _a;
                return new domain_1.Doctor(doctor.id, doctor.name, doctor.email, doctor.password, doctor.specialty, doctor.availableDays, ((_a = doctor.appointments) === null || _a === void 0 ? void 0 : _a.map(app => app.id)) || [], // ✅ Convertir citas en un array de IDs
                doctor.role);
            });
        });
    }
    save(doctor) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDoctor = yield prisma.doctor.create({
                data: {
                    name: doctor.name,
                    email: doctor.email,
                    password: doctor.password,
                    specialty: doctor.specialty,
                    availableDays: doctor.availableDays,
                    role: doctor.role
                }
            });
            const doctorRole = newDoctor.role;
            return new domain_1.Doctor(newDoctor.id, newDoctor.name, newDoctor.email, newDoctor.password, newDoctor.specialty, newDoctor.availableDays, [], doctorRole);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield prisma.doctor.findUnique({
                where: { email },
                include: { appointments: true }
            });
            if (!doctor)
                return null;
            return new domain_1.Doctor(doctor.id, doctor.name, doctor.email, doctor.password, doctor.specialty, doctor.availableDays, doctor.appointments.map(app => app.id), doctor.role);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield prisma.doctor.findUnique({
                where: { id },
                include: { appointments: true }
            });
            if (!doctor)
                return null;
            return new domain_1.Doctor(doctor.id, doctor.name, doctor.email, doctor.password, doctor.specialty, doctor.availableDays, doctor.appointments.map(app => app.id), doctor.role);
        });
    }
    update(doctor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.doctor.update({
                where: { id: doctor.id },
                data: {
                    name: doctor.name,
                    email: doctor.email,
                    password: doctor.password,
                    specialty: doctor.specialty,
                    availableDays: doctor.availableDays,
                    role: doctor.role
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.doctor.delete({ where: { id } });
        });
    }
}
exports.PrismaDoctorRepository = PrismaDoctorRepository;
