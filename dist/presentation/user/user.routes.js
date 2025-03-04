"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const prisma_user_repository_1 = require("../../infrastructure/repositories/prisma-user.repository");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const user_validator_1 = require("../validators/user.validator");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new user_controller_1.UserController(new prisma_user_repository_1.PrismaUserRepository());
        //Obtener datos de un usuario (solo el usuario atenticado)
        router.get('/:id', auth_middleware_1.authMiddleware, controller.getUser);
        //Obtener todos los usuarios (solo administradores pueden ver esta lista)
        router.get('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['admin']), controller.getAllUsers);
        //Actualizar perfil del usuario (solo el usuario autenticado)
        router.put('/:id', auth_middleware_1.authMiddleware, user_validator_1.validateUserUpdate, validate_middleware_1.validateMiddleware, controller.updateUser);
        //Eliminar cuenta del usuario (solo el usuario)
        router.delete('/:id', auth_middleware_1.authMiddleware, controller.deleteUser);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
