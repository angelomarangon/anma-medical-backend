
export enum AppointmentStatus {
    SCHEDULED = 'scheduled',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
}

export class Appointment {

    constructor(
        public readonly id: string,
        public userId: string,
        public doctorId: string,
        public date: Date,
        public status: 'scheduled' | 'completed' | 'cancelled' = 'scheduled',
        public paymentStatus: 'pending' | 'paid' = 'pending',
    ){}

    completeAppointment() {
        this.status = 'completed';
    }

    cancelAppointment() {
        this.status = 'cancelled';
    }

    markAsPaid() {
        this.paymentStatus = 'paid';
    }
}

