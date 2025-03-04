"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.PaymentStatus = exports.AppointmentStatus = void 0;
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["SCHEDULED"] = "scheduled";
    AppointmentStatus["COMPLETED"] = "completed";
    AppointmentStatus["CANCELLED"] = "cancelled";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PAID"] = "paid";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
class Appointment {
    constructor(id, userId, doctorId, date, status = 'scheduled', paymentStatus = 'pending') {
        this.id = id;
        this.userId = userId;
        this.doctorId = doctorId;
        this.date = date;
        this.status = status;
        this.paymentStatus = paymentStatus;
    }
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
exports.Appointment = Appointment;
