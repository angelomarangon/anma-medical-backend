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
exports.CreateUserUseCase = void 0;
const user_entity_1 = require("../../../domain/entities/user.entity");
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = options;
            const existingUser = yield this.userRepository.findByEmail(email);
            if (existingUser) {
                throw new Error('User already exists');
            }
            const newUser = new user_entity_1.User(crypto.randomUUID(), name, email, password, 'user');
            return this.userRepository.save(newUser);
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
