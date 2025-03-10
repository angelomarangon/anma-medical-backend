
export enum AppointmentStatus {
    SCHEDULED = 'scheduled',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
}

//h

export class Appointment {

    constructor(
        public readonly id: string,
        public userId: string,
        public doctorId: string,
        public date: Date,
        public time: string,
        public status: 'scheduled' | 'completed' | 'cancelled' = 'scheduled',
        public paymentStatus: 'pending' | 'paid' = 'pending',
        public diagnosis?: string,
        public doctor?: { name: string; specialty: string }
    ){}

    completeAppointment(diagnosis: string) {
        this.status = 'completed';
        this.diagnosis = diagnosis;
    }

    cancelAppointment() {
        this.status = 'cancelled';
    }

    markAsPaid() {
        this.paymentStatus = 'paid';
    }
}

