export class Doctor {

    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public password: string,
        public specialty: string,
        public availableDays: string[],
        public availableHours?: { [key: string]: { start: string; end: string }[] },
        public identityNumber?: string,
        public licenseNumber?: string,
        public phone?: string,
        public address?: string,
        public city?: string,
        public nationality?: string,
        public gender?: string,
        public birthDate?: Date,
        public profileImage?: string,
        public appointments: string[] = [],  // ✅ Asegurar que es un arreglo
        public role: 'doctor' = 'doctor'
    ){}

    /**
     * 🛠 **Actualizar perfil del doctor**
     * @param data Objeto con los datos a actualizar
     */
    updateProfile(data: Partial<Omit<Doctor, 'id' | 'appointments'>>) {
        Object.assign(this, data);
    }

    /**
     * ✅ **Agregar un día disponible**
     * @param day Día a agregar
     */
    addAvailableDay(day: string) {
        if (!this.availableDays.includes(day)) {
            this.availableDays.push(day);
        }
    }

    /**
     * ❌ **Eliminar un día disponible**
     * @param day Día a eliminar
     */
    removeAvailableDay(day: string) {
        this.availableDays = this.availableDays.filter(d => d !== day);
    }

    /**
     * 🕒 **Agregar un rango horario a un día de trabajo**
     * @param day Día de la semana
     * @param start Hora de inicio (HH:mm)
     * @param end Hora de fin (HH:mm)
     */
    addAvailableHours(day: string, start: string, end: string) {
        if (!this.availableHours) this.availableHours = {};

        if (!this.availableHours[day]) {
            this.availableHours[day] = [];
        }

        this.availableHours[day].push({ start, end });
    }

    /**
     * ❌ **Eliminar un horario disponible**
     * @param day Día de la semana
     * @param start Hora de inicio (HH:mm)
     * @param end Hora de fin (HH:mm)
     */
    removeAvailableHours(day: string, start: string, end: string) {
        if (this.availableHours && this.availableHours[day]) {
            this.availableHours[day] = this.availableHours[day].filter(
                (h) => h.start !== start || h.end !== end
            );

            // Si no quedan horarios en ese día, eliminar el día
            if (this.availableHours[day].length === 0) {
                delete this.availableHours[day];
            }
        }
    }

    /**
     * 🔒 **Cambiar contraseña**
     * @param newPassword Nueva contraseña
     */
    changePassword(newPassword: string) {
        this.password = newPassword;
    }
}