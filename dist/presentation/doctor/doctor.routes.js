"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRoutes = void 0;
const express_1 = require("express");
const doctor_controller_1 = require("./doctor.controller");
const prisma_doctor_repository_1 = require("../../infrastructure/repositories/prisma-doctor.repository");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
class DoctorRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const doctorRepository = new prisma_doctor_repository_1.PrismaDoctorRepository();
        const controller = new doctor_controller_1.DoctorController(doctorRepository);
        // Registrar un nuevo doctor (solo para administradores)
        router.post('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['admin']), controller.createDoctor);
        // Obtener la lista de doctores (Todos los usuarios autenticados pueden verlos)
        router.get('/', auth_middleware_1.authMiddleware, controller.getAllDoctor);
        // Obtener un doctor por su ID
        router.get('/:id', auth_middleware_1.authMiddleware, controller.getDoctor);
        // Eliminar un doctor (Solo administradores pueden hacerlo)
        router.delete('/:id', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['admin']), controller.deleteDoctor);
        return router;
    }
}
exports.DoctorRoutes = DoctorRoutes;
