const express = require("express");
const letLogoinCheck = require("../api/Middleware/login.middleware");
const appointmentRouter = express.Router();
const AppointmentController = require("../api/Controller/appointment.controller");
const { isUser } = require("../api/Middleware/rabc.middleware");
const appointment_Ctrl = new AppointmentController();

appointmentRouter.route("/book-appointment/:id")
    .post(letLogoinCheck,isUser,appointment_Ctrl.bookappointment);
appointmentRouter.route("/get-appointment")
    .get(letLogoinCheck,appointment_Ctrl.listAppointment);

module.exports = appointmentRouter;
