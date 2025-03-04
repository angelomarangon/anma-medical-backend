
export class User {

    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: 'user' | 'admin' | 'doctor' | 'receptionist',
    ){}

    changePassword(newPassword: string) {
        this.password = newPassword;
    }
}

