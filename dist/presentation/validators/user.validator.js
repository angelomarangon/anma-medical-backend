"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdate = void 0;
const express_validator_1 = require("express-validator");
exports.validateUserUpdate = [
    (0, express_validator_1.check)('name').optional().isString().withMessage('Name must be a string'),
    (0, express_validator_1.check)('email').optional().isEmail().withMessage('Invalid email format'),
];
