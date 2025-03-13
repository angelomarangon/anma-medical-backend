import { Request, Response } from "express";
import { AppointmentRepository, DoctorRepository, UserRepository } from "../../domain";
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

            if (req.user?.id !== userId && req.user?.role !== 'admin') {
                res.status(403).json({ error: 'Forbidden: You can only view your own appointments' });
                return;
            }

            const appointments = await this.appointmentRepository.findAllByUser(userId);
            res.json(appointments.map(app => ({
                id: app.id,
                userId: app.userId,
                doctorId: app.doctorId,
                date: app.date,
                time: app.time ?? "00:00",
                status: app.status,
                paymentStatus: app.paymentStatus,
                diagnosis: app.diagnosis ?? "",
                doctor: app.doctor
            })));
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    getAppointmentsByDoctor = async (req: AuthRequest, res: Response) => {
        try {
            const { doctorId } = req.params;
            const { role, id: userId } = req.user!;
    
            // Permitir acceso a:
            // - El doctor que está autenticado y consulta sus propias citas
            // - Administradores que pueden ver citas de cualquier doctor
            // - Usuarios que buscan turnos disponibles
            if (role !== "admin" && role !== "user" && userId !== doctorId) {
                return res.status(403).json({ error: 'Forbidden: You do not have access to this data' });
            }
    
            const appointments = await this.appointmentRepository.findAllByDoctor(doctorId);
            return res.json(appointments.map(app => ({
                id: app.id,
                userId: app.userId,
                doctorId: app.doctorId,
                date: app.date,
                time: app.time ?? "00:00",
                status: app.status,
                paymentStatus: app.paymentStatus,
                diagnosis: app.diagnosis ?? ""
            })));
        } catch (error) {
            console.error("Error al obtener citas:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    scheduleAppointment = async (req: Request, res: Response) => {
        try {
            const { userId, doctorId, date, time } = req.body;
            if (!time) {
                res.status(400).json({ message: 'Time is required for scheduling an appointment' });
                return;
            }

            const scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(
                this.appointmentRepository,
                this.userRepository,
                this.doctorRepository
            );

            const appointment = await scheduleAppointmentUseCase.execute({
                userId,
                doctorId,
                date: new Date(date),
                time
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

            res.json({ message: 'Appointment canceled successfully' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    completeAppointment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { doctorId, diagnosis } = req.body;

            if (!doctorId) {
                res.status(400).json({ error: 'Doctor ID is required' });
                return;
            }

            if (!diagnosis) {
                res.status(400).json({ error: 'Diagnosis is required to complete the appointment' });
                return;
            }

            const completeAppointmentUseCase = new CompleteAppointmentUseCase(
                this.appointmentRepository
            );

            await completeAppointmentUseCase.execute(id, { id: doctorId }, diagnosis);

            res.json({ message: 'Appointment completed successfully' });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    deleteAppointment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const userId = (req as AuthRequest).user?.id;

            if (!userId) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }

            const existingAppointment = await this.appointmentRepository.findById(id);
            if (!existingAppointment) {
                res.status(404).json({ message: "Cita no encontrada" });
                return;
            }

            if (existingAppointment.userId !== userId) {
                res.status(403).json({ message: "No tienes permiso para eliminar esta cita" });
                return;
            }

            await this.appointmentRepository.delete(id);

            res.status(200).json({ message: "Cita eliminada exitosamente" });
        } catch (error) {
            console.error("Error eliminando la cita:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    };
}