import { Request, Response } from "express";
import { UserRepository } from "../../domain";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { envs } from "../../config";



export class AuthController {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

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
                    role: user.role
                }, 
                envs.JWT_SEED,
                {expiresIn: '2h'}
            );

            res.json({message: 'Login Successful', token})
        } catch (error) {
            res.status(400).json({error})
        }
    }
}