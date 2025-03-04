


export class Doctor {

    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public password: string,
        public specialty: string,
        public availableDays: string[],
        public appointments: string[] = [],
        public role: 'doctor' = 'doctor'
    ){}

    addAvailableDay(day: string){
        if (!this.availableDays.includes(day)) {
            this.availableDays.push(day);
        }
    }

    removeAvailableDay(day:string){
        this.availableDays = this.availableDays.filter(d => d !== day);
    }

    changePassword(newPassword: string) {
        this.password = newPassword;
    }
}

