"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegister = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
exports.validateLogin = [
    (0, express_validator_1.check)('email').isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.check)('password').notEmpty().withMessage('Password is required'),
];
