"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth/auth.routes");
const user_routes_1 = require("./user/user.routes");
const doctor_routes_1 = require("./doctor/doctor.routes");
const appointment_routes_1 = require("./appointment/appointment.routes");
const admin_routes_1 = require("./admin/admin.routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/auth', auth_routes_1.AuthRoutes.routes);
        router.use('/api/user', user_routes_1.UserRoutes.routes);
        router.use('/api/doctor', doctor_routes_1.DoctorRoutes.routes);
        router.use('/api/appointment', appointment_routes_1.AppountmentRoutes.routes);
        router.use('/api/admin', admin_routes_1.AdminRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
