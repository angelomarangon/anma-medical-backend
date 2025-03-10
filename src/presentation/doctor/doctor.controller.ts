import { Request, Response } from "express";
import { DoctorRepository } from "../../domain";
import { CreateDoctorUseCase } from "../../application/use-cases/doctor/create-doctor.use-case";
import { UpdateDoctorAvailabilityUseCase } from "../../application/use-cases/doctor/update-doctor-availability.use-case";





export class DoctorController {

    constructor(
        private readonly doctorRepository: DoctorRepository
    ) { }

    createDoctor = async (req: Request, res: Response) => {
        try {
            const { name, email, password, specialty, availableDays } = req.body;
            const createDoctorUseCase = new CreateDoctorUseCase(this.doctorRepository);
            const doctor = await createDoctorUseCase.execute(
                {
                    name,
                    email,
                    password,
                    specialty,
                    availableDays
                });

            res.status(201).json({ message: 'Doctor created successfully', doctor });
        } catch (error) {
            res.status(400).json({ error: 'Bad request' })
        }
    }

    getDoctor = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const doctor = await this.doctorRepository.findById(id);
            if (!doctor) {
                res.status(404).json({ error: 'Doctor not found' });
                return;
            }
            res.status(200).json({ doctor });
        } catch (error) {
            res.status(400).json({ error: 'Bad request' })
        }
    }

    getAllDoctor = async (req: Request, res: Response) => {
        try {
            const doctors = await this.doctorRepository.findAll();

            res.json({ doctors });
        } catch (error) {
            res.status(400).json({ error: 'Bad request' })
        }
    }

    deleteDoctor = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const doctor = await this.doctorRepository.findById(id);
            if (!doctor) {
                res.status(404).json({ error: "Doctor not found" });
                return;
            }
            await this.doctorRepository.delete(id);

            res.json({ message: 'Doctor deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Bad request' })
        }
    }

    updateDoctorAvailability = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { availableDays, availableHours } = req.body;

            const updateDoctorAvailabilityUseCase = new UpdateDoctorAvailabilityUseCase(this.doctorRepository);
            const doctor = await updateDoctorAvailabilityUseCase.execute(id, availableDays, availableHours);

            res.status(200).json({ message: "Availability updated successfully", doctor });
        } catch (error) {
            res.status(400).json({ error: "Bad request" });
        }
    };

}