"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.envs.JWT_SEED);
        if (!['user', 'admin', 'doctor', 'receptionist'].includes(decoded.role)) {
            res.status(403).json({ error: 'Forbidden: Invalid role' });
            return;
        }
        req.user = { id: decoded.id, role: decoded.role };
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return;
    }
};
exports.authMiddleware = authMiddleware;
