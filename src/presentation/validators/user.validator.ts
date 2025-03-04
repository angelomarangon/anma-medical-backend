import { check } from 'express-validator';

export const validateUserUpdate = [
    check('name').optional().isString().withMessage('Name must be a string'),
    check('email').optional().isEmail().withMessage('Invalid email format'),
];