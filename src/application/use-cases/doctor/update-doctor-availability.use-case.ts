import { DoctorRepository } from "../../../domain";

export class UpdateDoctorAvailabilityUseCase {
    constructor(private readonly doctorRepository: DoctorRepository) {}

    async execute(doctorId: string, availableDays: string[], availableHours: { [key: string]: { start: string; end: string }[] }) {
        const doctor = await this.doctorRepository.findById(doctorId);
        if (!doctor) {
            throw new Error("Doctor not found");
        }

        doctor.availableDays = availableDays;
        doctor.availableHours = availableHours;

        await this.doctorRepository.update(doctor);
        return doctor;
    }
}