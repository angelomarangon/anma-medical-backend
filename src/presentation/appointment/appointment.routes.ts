import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import { PrismaAppointmentRepository } from "../../infrastructure/repositories/prisma-appointment.repository";
import { PrismaDoctorRepository } from "../../infrastructure/repositories/prisma-doctor.repository";
import { PrismaUserRepository } from "../../infrastructure/repositories/prisma-user.repository";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validateAppointment } from "../validators/appointment.validator";
import { validateMiddleware } from "../middlewares/validate.middleware";





export class AppountmentRoutes {

    static get routes(): Router {
        const router = Router();

        const controller = new AppointmentController(
            new PrismaAppointmentRepository,
            new PrismaUserRepository,
            new PrismaDoctorRepository
        );

        // Agendar una cita médica (Cualquier usuario autenticado puede hacerlo)
        router.post('/', authMiddleware, validateAppointment, validateMiddleware, controller.scheduleAppointment);
        // Obtener citas de un usuario (Solo el usuario autenticado)
        router.get('/user/:userId', authMiddleware, controller.getAppointmentsByUser);
        // Obtener citas de un doctor (Solo el doctor autenticado)
        router.get('/doctor/:doctorId', authMiddleware, controller.getAppointmentsByDoctor);
        // Completar una cita (Solo los doctores pueden marcarla como completada)
        router.put('/:id/complete', authMiddleware, roleMiddleware(['doctor']), controller.completeAppointment)
        // Cancelar una cita (Usuarios, doctores y recepcionistas pueden hacerlo)
        router.put('/:id/cancel', authMiddleware, roleMiddleware(['user', 'doctor', 'receptionist']), controller.cancelAppointment)
        // Eliminar una cita (Solo administradores pueden hacerlo)
        router.delete('/:id', controller.getAppointment)

        return router;
    }
}