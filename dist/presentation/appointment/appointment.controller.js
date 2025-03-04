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
exports.AppointmentController = void 0;
const schedule_appointment_use_case_1 = require("../../application/use-cases/appointment/schedule-appointment.use-case");
const cancel_appointment_use_case_1 = require("../../application/use-cases/appointment/cancel-appointment.use-case");
const complete_appointment_use_case_1 = require("../../application/use-cases/appointment/complete-appointment.use-case");
class AppointmentController {
    constructor(appointmentRepository, userRepository, doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.getAppointmentsByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { userId } = req.params;
                // Verifica que el usuario autenticado solo pueda ver sus propias citas
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== userId && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== 'admin') {
                    res.status(403).json({ error: 'Forbidden: You can only view your own appointments' });
                    return;
                }
                const appointments = yield this.appointmentRepository.findAllByUser(userId);
                res.json(appointments);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        this.getAppointmentsByDoctor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { doctorId } = req.params;
                // Verifica que el doctor autenticado solo pueda ver sus propios pacientes
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== doctorId) {
                    res.status(403).json({ error: 'Forbidden: You can only view your own patients' });
                    return;
                }
                const appointments = yield this.appointmentRepository.findAllByDoctor(doctorId);
                res.json(appointments);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        this.scheduleAppointment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, doctorId, date } = req.body;
                const scheduleAppointmentUseCase = new schedule_appointment_use_case_1.ScheduleAppointmentUseCase(this.appointmentRepository, this.userRepository, this.doctorRepository);
                const appointment = yield scheduleAppointmentUseCase.execute({
                    userId,
                    doctorId,
                    date: new Date(date)
                });
                res.status(201).json({ message: 'Appointment scheduled successfully', appointment });
            }
            catch (error) {
                res.status(400).json({ message: 'Error scheduling appointment', error });
            }
        });
        this.cancelAppointment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { requesterId, requesterRole } = req.body;
                if (!requesterId || !requesterRole) {
                    res.status(400).json({ error: 'Requester ID and Role are required' });
                    return;
                }
                const cancelAppointmentUseCase = new cancel_appointment_use_case_1.CancelAppointmentUseCase(this.appointmentRepository);
                yield cancelAppointmentUseCase.execute(id, { id: requesterId, role: requesterRole });
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
        this.completeAppointment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { doctorId } = req.body;
                if (!doctorId) {
                    res.status(400).json({ error: 'Doctor ID is required' });
                    return;
                }
                const completeAppointmentUseCase = new complete_appointment_use_case_1.CompleteAppointmentUseCase(this.appointmentRepository);
                yield completeAppointmentUseCase.execute(id, { id: doctorId });
                res.json({ message: 'Appointment completed successfully' });
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
        this.getAppointment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json('getAppointment');
        });
    }
}
exports.AppointmentController = AppointmentController;
