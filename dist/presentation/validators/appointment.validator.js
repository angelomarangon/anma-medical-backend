"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointment = void 0;
const express_validator_1 = require("express-validator");
exports.validateAppointment = [
    (0, express_validator_1.check)('userId').notEmpty().withMessage('User ID is required'),
    (0, express_validator_1.check)('doctorId').notEmpty().withMessage('Doctor ID is required'),
    (0, express_validator_1.check)('date').isISO8601().withMessage('Date must be in ISO8601 format'),
];
