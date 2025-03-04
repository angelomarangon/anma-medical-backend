import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { PrismaDoctorRepository } from "../../infrastructure/repositories/prisma-doctor.repository";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from '../middlewares/role.middleware';



export class DoctorRoutes {

    static get routes(): Router {
        const router = Router();

        const doctorRepository = new PrismaDoctorRepository();
        const controller = new DoctorController(doctorRepository);
        
        // Registrar un nuevo doctor (solo para administradores)
        router.post('/', authMiddleware, roleMiddleware(['admin']), controller.createDoctor )
        // Obtener la lista de doctores (Todos los usuarios autenticados pueden verlos)
        router.get('/', authMiddleware, controller.getAllDoctor );
        // Obtener un doctor por su ID
        router.get('/:id', authMiddleware, controller.getDoctor );
        // Eliminar un doctor (Solo administradores pueden hacerlo)
        router.delete('/:id', authMiddleware, roleMiddleware(['admin']), controller.deleteDoctor )

        return router;
    }
}