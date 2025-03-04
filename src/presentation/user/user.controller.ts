import { Request, Response } from "express";
import { UserRepository } from '../../domain/repositories/user.repository';




export class UserController {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    getUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await this.userRepository.findById(id);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userRepository.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            const user = await this.userRepository.findById(id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            user.name = name || user.name;
            user.email = email || user.email;

            await this.userRepository.update(user);
            res.json({ message: 'User updated successfully', user });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await this.userRepository.findById(id);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            await this.userRepository.delete(id);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}