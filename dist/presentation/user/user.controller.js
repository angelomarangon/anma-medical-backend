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
exports.UserController = void 0;
class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.userRepository.findById(id);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }
                res.json(user);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.findAll();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, email } = req.body;
                const user = yield this.userRepository.findById(id);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }
                user.name = name || user.name;
                user.email = email || user.email;
                yield this.userRepository.update(user);
                res.json({ message: 'User updated successfully', user });
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.userRepository.findById(id);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }
                yield this.userRepository.delete(id);
                res.json({ message: 'User deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.UserController = UserController;
