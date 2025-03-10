import { UserRepository } from "../../../domain/repositories/user.repository";
import { User } from "../../../domain/entities/user.entity";

export class UpdateUserProfileUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(userId: string, data: Partial<Omit<User, 'id' | 'password' | 'role'>>) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        user.updateProfile(data);
        await this.userRepository.update(user);
    }
}