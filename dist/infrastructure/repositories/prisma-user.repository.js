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
exports.PrismaUserRepository = void 0;
const client_1 = require("@prisma/client");
const domain_1 = require("../../domain");
const prisma = new client_1.PrismaClient();
class PrismaUserRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            });
            return users.map(user => new domain_1.User(user.id, user.name, user.email, '', // No devolvemos la contraseña por seguridad
            user.role));
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield prisma.user.create({
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role
                }
            });
            const userRole = newUser.role;
            return new domain_1.User(newUser.id, newUser.name, newUser.email, newUser.password, userRole);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (!user)
                return null;
            return new domain_1.User(user.id, user.name, user.email, user.password, user.role);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { id } });
            if (!user)
                return null;
            return new domain_1.User(user.id, user.name, user.email, user.password, user.role);
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.update({
                where: { id: user.id },
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.delete({ where: { id } });
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
