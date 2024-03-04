const express = require("express");
const ScheduleController = require("../api/Controller/schedule.controller");
const letLogoinCheck = require("../api/Middleware/login.middleware");
const schedule_cntrl  = new ScheduleController();
const scheduleRoute = express.Router();

    scheduleRoute.route("/create-schedule")
        .post(letLogoinCheck,schedule_cntrl.createSchedule);
    scheduleRoute.route("/get-all-schedule/:id")
        .get(schedule_cntrl.getAllSchedule)
    

module.exports = scheduleRoute;