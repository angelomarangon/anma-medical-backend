import { UserRepository } from "../../../domain";
import { User } from "../../../domain/entities/user.entity";

interface Options {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute( options: Options ): Promise<User> {
        const { name, email, password } = options;
        const existingUser = await this.userRepository.findByEmail(email);
        if(existingUser) {
            throw new Error('User already exists');
        }

        const newUser = new User(
            crypto.randomUUID(),
            name,
            email,
            password,
            'user'
        );

        return this.userRepository.save(newUser);
    }

}