const express = require("express");
const adminRouter = express.Router();

const AdminController = require("../api/Controller/admin.contoller")
const admin_Ctrl = new AdminController();
const {isAdmin} = require("../api/Middleware/rabc.middleware")
const letLogoinCheck = require("../api/Middleware/login.middleware")


adminRouter.route("/requesdoctorList")
.get(letLogoinCheck,isAdmin,admin_Ctrl.getDoctorRequests)

adminRouter.route("/approvedoctor/:id")
    .post(admin_Ctrl.approveDoctor)
adminRouter.route("/getAllDoctor")
    .get(admin_Ctrl.getAllDoctor);
    
adminRouter.route("/deleteDoctor/:id")
    .delete(letLogoinCheck,isAdmin,admin_Ctrl.deleteDoctor);

module.exports = adminRouter;