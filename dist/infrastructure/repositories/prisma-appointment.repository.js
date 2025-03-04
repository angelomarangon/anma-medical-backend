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
exports.PrismaAppointmentRepository = void 0;
const client_1 = require("@prisma/client");
const domain_1 = require("../../domain");
const prisma = new client_1.PrismaClient();
class PrismaAppointmentRepository {
    save(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, userId, doctorId, date, status, paymentStatus } = appointment;
            const newAppointment = yield prisma.appointment.create({
                data: {
                    id,
                    userId,
                    doctorId,
                    date,
                    status: status,
                    paymentStatus: paymentStatus
                }
            });
            return new domain_1.Appointment(newAppointment.id, newAppointment.userId, newAppointment.doctorId, newAppointment.date, newAppointment.status, newAppointment.paymentStatus);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield prisma.appointment.findUnique({
                where: { id }
            });
            if (!appointment)
                return null;
            return new domain_1.Appointment(appointment.id, appointment.userId, appointment.doctorId, appointment.date, appointment.status, appointment.paymentStatus);
        });
    }
    findAllByDoctor(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield prisma.appointment.findMany({
                where: { doctorId },
                orderBy: { date: 'asc' }
            });
            return appointments.map(app => new domain_1.Appointment(app.id, app.userId, app.doctorId, app.date, app.status, app.paymentStatus));
        });
    }
    findAllByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield prisma.appointment.findMany({
                where: { userId },
                orderBy: { date: 'asc' }
            });
            return appointments.map(app => new domain_1.Appointment(app.id, app.userId, app.doctorId, app.date, app.status, app.paymentStatus));
        });
    }
    update(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.appointment.update({
                where: { id: appointment.id },
                data: {
                    status: appointment.status,
                    paymentStatus: appointment.paymentStatus
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.appointment.delete({ where: { id } });
        });
    }
}
exports.PrismaAppointmentRepository = PrismaAppointmentRepository;
