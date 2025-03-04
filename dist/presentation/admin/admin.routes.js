"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const admin_constroller_1 = require("./admin.constroller");
class AdminRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new admin_constroller_1.AdminController();
        router.post('/create-doctor', controller.createDoctor);
        router.delete('/delete-doctor/:id', controller.removeDoctor);
        return router;
    }
}
exports.AdminRoutes = AdminRoutes;
