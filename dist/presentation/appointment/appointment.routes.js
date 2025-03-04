"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppountmentRoutes = void 0;
const express_1 = require("express");
const appointment_controller_1 = require("./appointment.controller");
const prisma_appointment_repository_1 = require("../../infrastructure/repositories/prisma-appointment.repository");
const prisma_doctor_repository_1 = require("../../infrastructure/repositories/prisma-doctor.repository");
const prisma_user_repository_1 = require("../../infrastructure/repositories/prisma-user.repository");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const appointment_validator_1 = require("../validators/appointment.validator");
const validate_middleware_1 = require("../middlewares/validate.middleware");
class AppountmentRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new appointment_controller_1.AppointmentController(new prisma_appointment_repository_1.PrismaAppointmentRepository, new prisma_user_repository_1.PrismaUserRepository, new prisma_doctor_repository_1.PrismaDoctorRepository);
        // Agendar una cita médica (Cualquier usuario autenticado puede hacerlo)
        router.post('/', auth_middleware_1.authMiddleware, appointment_validator_1.validateAppointment, validate_middleware_1.validateMiddleware, controller.scheduleAppointment);
        // Obtener citas de un usuario (Solo el usuario autenticado)
        router.get('/user/:userId', auth_middleware_1.authMiddleware, controller.getAppointmentsByUser);
        // Obtener citas de un doctor (Solo el doctor autenticado)
        router.get('/doctor/:doctorId', auth_middleware_1.authMiddleware, controller.getAppointmentsByDoctor);
        // Completar una cita (Solo los doctores pueden marcarla como completada)
        router.put('/:id/complete', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['doctor']), controller.completeAppointment);
        // Cancelar una cita (Usuarios, doctores y recepcionistas pueden hacerlo)
        router.put('/:id/cancel', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['user', 'doctor', 'receptionist']), controller.cancelAppointment);
        // Eliminar una cita (Solo administradores pueden hacerlo)
        router.delete('/:id', controller.getAppointment);
        return router;
    }
}
exports.AppountmentRoutes = AppountmentRoutes;
