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
exports.ScheduleAppointmentUseCase = void 0;
const appointment_entity_1 = require("../../../domain/entities/appointment.entity");
class ScheduleAppointmentUseCase {
    constructor(appointmentRepository, userRepository, doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
    }
    execute(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, doctorId, date } = options;
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const doctor = yield this.doctorRepository.findById(doctorId);
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            const newAppointment = new appointment_entity_1.Appointment(crypto.randomUUID(), userId, doctorId, date, 'scheduled', 'pending');
            return this.appointmentRepository.save(newAppointment);
        });
    }
}
exports.ScheduleAppointmentUseCase = ScheduleAppointmentUseCase;
