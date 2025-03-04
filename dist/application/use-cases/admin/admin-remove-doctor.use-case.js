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
exports.AdminRemoveDoctorUseCase = void 0;
class AdminRemoveDoctorUseCase {
    constructor(doctorRepository, appointmentRepository) {
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
    }
    execute(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.doctorRepository.findById(doctorId);
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            // Eliminar todas las citas asociadas al doctor antes de eliminarlo
            const appointments = yield this.appointmentRepository.findAllByDoctor(doctorId);
            for (const appointment of appointments) {
                yield this.appointmentRepository.delete(appointment.id);
            }
            yield this.doctorRepository.delete(doctorId);
        });
    }
}
exports.AdminRemoveDoctorUseCase = AdminRemoveDoctorUseCase;
