import { check } from 'express-validator';

export const validateAppointment = [
    check('userId').notEmpty().withMessage('User ID is required'),
    check('doctorId').notEmpty().withMessage('Doctor ID is required'),
    check('date').isISO8601().withMessage('Date must be in ISO8601 format'),
];