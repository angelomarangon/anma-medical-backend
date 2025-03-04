import { check } from 'express-validator';

export const validateRegister = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const validateLogin = [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').notEmpty().withMessage('Password is required'),
];