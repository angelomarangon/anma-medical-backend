import { Router } from "express";
import { AdminController } from "./admin.constroller";


export class AdminRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new AdminController();

        router.post('/create-doctor', controller.createDoctor );
        router.delete('/delete-doctor/:id', controller.removeDoctor );

        return router;
    }
}