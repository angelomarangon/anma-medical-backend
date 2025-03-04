"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const prisma_user_repository_1 = require("../../infrastructure/repositories/prisma-user.repository");
const auth_validator_1 = require("../validators/auth.validator");
const validate_middleware_1 = require("../middlewares/validate.middleware");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const userRepository = new prisma_user_repository_1.PrismaUserRepository;
        const controller = new auth_controller_1.AuthController(userRepository);
        // Registrar usuario
        router.post('/register', auth_validator_1.validateRegister, validate_middleware_1.validateMiddleware, controller.register);
        // Iniciar sesion y obtener un token JWT
        router.post('/login', auth_validator_1.validateLogin, validate_middleware_1.validateMiddleware, controller.login);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
