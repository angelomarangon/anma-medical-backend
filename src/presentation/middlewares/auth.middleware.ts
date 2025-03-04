import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { envs } from "../../config";

interface AuthRequest extends Request {
    user?: {
        id: string;
        role: 'user' | 'admin' | 'doctor' | 'receptionist';
    };
}

export const authMiddleware = (req:AuthRequest, res:Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        res.status(401).json({message: 'Unauthorized: No token provided'});
        return;
    }

    try {
        const decoded = jwt.verify(token, envs.JWT_SEED!) as {id: string; role: string};
        
        if (!['user', 'admin', 'doctor', 'receptionist'].includes(decoded.role)) {
            res.status(403).json({ error: 'Forbidden: Invalid role' });
            return;
        }

        req.user = { id: decoded.id, role: decoded.role as 'user' | 'admin' | 'doctor' | 'receptionist' };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return;
    }
}