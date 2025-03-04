import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { PrismaUserRepository } from "../../infrastructure/repositories/prisma-user.repository";
import { validateMiddleware } from '../middlewares/validate.middleware';
import { validateUserUpdate } from "../validators/user.validator";





export class UserRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new UserController(new PrismaUserRepository());
        
        //Obtener datos de un usuario (solo el usuario atenticado)
        router.get('/:id', authMiddleware, controller.getUser )
        //Obtener todos los usuarios (solo administradores pueden ver esta lista)
        router.get('/', authMiddleware, roleMiddleware(['admin']) , controller.getAllUsers )
        //Actualizar perfil del usuario (solo el usuario autenticado)
        router.put('/:id', authMiddleware , validateUserUpdate, validateMiddleware, controller.updateUser )
        //Eliminar cuenta del usuario (solo el usuario)
        router.delete('/:id', authMiddleware, controller.deleteUser )

        return router;
    }
}