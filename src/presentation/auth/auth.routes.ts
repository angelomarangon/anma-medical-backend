import { Router } from "express";
import { AuthController } from "./auth.controller";
import { PrismaUserRepository } from "../../infrastructure/repositories/prisma-user.repository";
import { validateLogin, validateRegister } from "../validators/auth.validator";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { PrismaDoctorRepository } from "../../infrastructure/repositories/prisma-doctor.repository";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const userRepository = new PrismaUserRepository;
        const doctorRepository = new PrismaDoctorRepository
        const controller = new AuthController(
            userRepository,
            doctorRepository
        );

        // Endpoint para verificar usuario autenticado
        router.get('/me', authMiddleware, controller.me)
        // Registrar usuario
        router.post('/register', validateRegister, validateMiddleware, controller.register );
        // Iniciar sesion y obtener un token JWT
        router.post('/login', validateLogin, validateMiddleware, controller.login );

        return router;
    }
}