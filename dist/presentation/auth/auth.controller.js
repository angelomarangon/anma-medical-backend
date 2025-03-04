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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const create_user_use_case_1 = require("../../application/use-cases/user/create-user.use-case");
const config_1 = require("../../config");
class AuthController {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                //Hashear la contraseña antes de guardar
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const createUserUseCase = new create_user_use_case_1.CreateUserUseCase(this.userRepository);
                const user = yield createUserUseCase.execute({ name, email, password: hashedPassword });
                res.status(201).json({ message: 'User registed successfully', user });
            }
            catch (error) {
                res.status(400).json({ error });
                console.log(req.body);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userRepository.findByEmail(email);
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({ message: 'Invalid credentials' });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({
                    id: user.id,
                    role: user.role
                }, config_1.envs.JWT_SEED, { expiresIn: '2h' });
                res.json({ message: 'Login Successful', token });
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
    }
}
exports.AuthController = AuthController;
