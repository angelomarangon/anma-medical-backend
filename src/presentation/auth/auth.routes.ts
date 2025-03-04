import { Router } from "express";
import { AuthController } from "./auth.controller";
import { PrismaUserRepository } from "../../infrastructure/repositories/prisma-user.repository";
import { validateLogin, validateRegister } from "../validators/auth.validator";
import { validateMiddleware } from "../middlewares/validate.middleware";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const userRepository = new PrismaUserRepository
        const controller = new AuthController(userRepository);

        // Registrar usuario
        router.post('/register', validateRegister, validateMiddleware, controller.register );
        // Iniciar sesion y obtener un token JWT
        router.post('/login', validateLogin, validateMiddleware, controller.login );

        return router;
    }
}