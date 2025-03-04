import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { UserRoutes } from "./user/user.routes";
import { DoctorRoutes } from "./doctor/doctor.routes";
import { AppountmentRoutes } from "./appointment/appointment.routes";
import { AdminRoutes } from "./admin/admin.routes";




export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        
        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/user', UserRoutes.routes)
        router.use('/api/doctor', DoctorRoutes.routes)
        router.use('/api/appointment', AppountmentRoutes.routes)
        router.use('/api/admin', AdminRoutes.routes)
        

        return router;
    }
}