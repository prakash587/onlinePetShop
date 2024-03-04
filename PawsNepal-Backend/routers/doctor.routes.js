const express = require("express");
const doctorRouter = express.Router();
const DoctorsController = require("../api/Controller/doctor.controller");
const doctor_cntrl  = new DoctorsController();
doctorRouter.route("/getalldoctors")
    .get(doctor_cntrl.getAllDoctor);
doctorRouter.route("/getdoctorbyid/:id")
    .get(doctor_cntrl.getDoctorById);
doctorRouter.route("/serchdoctor")
    .get(doctor_cntrl.getDoctorByName)
    
module.exports = doctorRouter; 