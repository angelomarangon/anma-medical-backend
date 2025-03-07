import { Request, Response } from "express"
import { AppointmentRepository, DoctorRepository, UserRepository } from "../../domain"
import { ScheduleAppointmentUseCase } from "../../application/use-cases/appointment/schedule-appointment.use-case";
import { CancelAppointmentUseCase } from "../../application/use-cases/appointment/cancel-appointment.use-case";
import { CompleteAppointmentUseCase } from "../../application/use-cases/appointment/complete-appointment.use-case";

interface AuthRequest extends Request {
    user?: {
        id: string;
        role: 'user' | 'admin' | 'doctor' | 'receptionist';
    };
}

export class AppointmentController {

    constructor(
        private readonly appointmentRepository: AppointmentRepository,
        private readonly userRepository: UserRepository,
        private readonly doctorRepository: DoctorRepository
    ) { }

    getAppointmentsByUser = async (req: AuthRequest, res: Response) => {
        try {
            const { userId } = req.params;

            // Verifica que el usuario autenticado solo pueda ver sus propias citas
            if (req.user?.id !== userId && req.user?.role !== 'admin') {
                res.status(403).json({ error: 'Forbidden: You can only view your own appointments' });
                return;
            }

            const appointments = await this.appointmentRepository.findAllByUser(userId);
            res.json(appointments);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    getAppointmentsByDoctor = async (req: AuthRequest, res: Response) => {
        try {
            const { doctorId } = req.params;

            // Verifica que el doctor autenticado solo pueda ver sus propios pacientes
            if (req.user?.id !== doctorId) {
                res.status(403).json({ error: 'Forbidden: You can only view your own patients' });
                return;
            }

            const appointments = await this.appointmentRepository.findAllByDoctor(doctorId);
            res.json(appointments);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    scheduleAppointment = async (req: Request, res: Response) => {
        try {
            const { userId, doctorId, date } = req.body;
            const scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(
                this.appointmentRepository,
                this.userRepository,
                this.doctorRepository
            );

            const appointment = await scheduleAppointmentUseCase.execute({
                userId,
                doctorId,
                date: new Date(date)
            });
            res.status(201).json({ message: 'Appointment scheduled successfully', appointment });
        } catch (error) {
            res.status(400).json({ message: 'Error scheduling appointment', error });
        }
    }

    cancelAppointment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { requesterId, requesterRole } = req.body;
            if (!requesterId || !requesterRole) {
                res.status(400).json({ error: 'Requester ID and Role are required' });
                return;
            }

            const cancelAppointmentUseCase = new CancelAppointmentUseCase(this.appointmentRepository);
            await cancelAppointmentUseCase.execute(id, { id: requesterId, role: requesterRole });
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    completeAppointment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { doctorId } = req.body;

            if (!doctorId) {
                res.status(400).json({ error: 'Doctor ID is required' });
                return;
            }

            const completeAppointmentUseCase = new CompleteAppointmentUseCase(
                this.appointmentRepository
            );

            await completeAppointmentUseCase.execute(id, { id: doctorId });

            res.json({ message: 'Appointment completed successfully' });
        } catch (error) {
            res.status(400).json({ error })
        }
    }

    deleteAppointment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params; 
            const userId = (req as AuthRequest).user?.id; // ✅ Tomar el usuario autenticado desde `req.user`
    
            if (!userId) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
    
            const existingAppointment = await this.appointmentRepository.findById(id);
            if (!existingAppointment) {
                res.status(404).json({ message: "Cita no encontrada" });
                return;
            }
    
            // ✅ Verificar que el usuario autenticado sea el dueño de la cita
            if (existingAppointment.userId !== userId) {
                res.status(403).json({ message: "No tienes permiso para eliminar esta cita" });
                return;
            }
    
            // ✅ Eliminar la cita
            await this.appointmentRepository.delete(id);
    
            res.status(200).json({ message: "Cita eliminada exitosamente" });
        } catch (error) {
            console.error("Error eliminando la cita:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };
}