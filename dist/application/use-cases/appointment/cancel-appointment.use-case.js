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
exports.CancelAppointmentUseCase = void 0;
class CancelAppointmentUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    execute(appointmentId, requester) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield this.appointmentRepository.findById(appointmentId);
            if (!appointment) {
                throw new Error('Appointment not found');
            }
            if (requester.role === 'user' && appointment.userId !== requester.id) {
                throw new Error('You are not authorized to cancel this appointment');
            }
            appointment.cancelAppointment();
            yield this.appointmentRepository.update(appointment);
        });
    }
}
exports.CancelAppointmentUseCase = CancelAppointmentUseCase;
