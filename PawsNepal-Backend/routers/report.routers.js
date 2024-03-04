const express = require("express");
const letLogoinCheck = require("../api/Middleware/login.middleware");
// const { isDoctor } = require("../api/Middleware/rabc.middleware");
const ReportController = require("../api/Controller/report.controller");
const report_Ctrl = new ReportController();


const reportRouter = express.Router();

reportRouter.route("/create-report/:id")
    .post(letLogoinCheck,report_Ctrl.createReport);
reportRouter.route("/fetch-report/:id")
    .get(report_Ctrl.fetchReportfromAppointmentId);


module.exports = reportRouter;