
export class User {

    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: 'user' | 'admin' | 'doctor' | 'receptionist',

        // Datos opcionales
        public identityNumber?: string,
        public socialSecurity?: string,
        public phone?: string,
        public address?: string,
        public postalCode?: string,
        public city?: string,
        public gender?: string,
        public birthDate?: Date,
        public bloodType?: string
    ){}

    updateProfile(data: Partial<Omit<User, 'id'>>) {
        Object.assign(this, data);
    }

    changePassword(newPassword: string) {
        this.password = newPassword;
    }
}

