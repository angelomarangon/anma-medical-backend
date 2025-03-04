import { NextFunction, Request, Response } from "express"

interface AuthUser {
    id: string;
    role: 'user' | 'admin' | 'doctor' | 'receptionist';
}

interface AuthRequest extends Request {
    user?: AuthUser;
}

export const roleMiddleware = (roles: Array<'user' | 'admin' | 'doctor' | 'receptionist'>) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized: No token provided' });
            return ;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
            return ;
        }

        next();
    };
}