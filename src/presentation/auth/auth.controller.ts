import { Request, Response } from "express";
import { UserRepository } from "../../domain";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { envs } from "../../config";

interface AuthRequest extends Request {
    user?: {
        id: string;
        name: string;
        role: 'user' | 'admin' | 'doctor' | 'receptionist';
    };
}

export class AuthController {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    me = async (req: AuthRequest, res: Response) => {
        if (!req.user?.id) {
            res.status(400).json({ message: "User ID is missing" }); // 🔹 Evitamos pasar undefined
            return ;
        }

        const user = await this.userRepository.findById(req.user.id); // 🔹 Asegurar que obtenemos el usuario de la BD
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        } 

        res.json({
            user: {
                id: user.id,
                name: user.name, // 🔹 Asegura que name está incluido
                role: user.role
            }
        });

    }

    register = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;

            //Hashear la contraseña antes de guardar
            const hashedPassword = await bcrypt.hash(password, 10);
            const createUserUseCase = new CreateUserUseCase(this.userRepository);
            const user = await createUserUseCase.execute({ name, email, password: hashedPassword });

            res.status(201).json({ message: 'User registed successfully', user });
        } catch (error) {
            res.status(400).json({ error });
            console.log(req.body)
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    name: user.name,
                    role: user.role
                },
                envs.JWT_SEED,
                { expiresIn: '2h' }
            );

            res.json({
                message: 'Login Successful',
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role
                },
                token
            })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}