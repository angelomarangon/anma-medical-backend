import { User } from "../entities/user.entity";

export interface UserRepository {
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}
