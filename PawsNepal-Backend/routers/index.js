const express = require("express");
const app  = express();
const user_router = require("./user.routers")
const pet_routes = require("./pet.routers")
const product_routes = require("./product.routes")
const admin_Routes = require("./admin.routers")
const doctor_Routes = require("./doctor.routes")
const schedule_router = require("./schedule.routes")
const appointment_router = require("./appointment.routes")
const report_router = require("./report.routers")
const order_router = require("./order.roters")
const feedbac_router = require("./feedback.routers")
const notify_router = require("./notification.routers")

app.use("/user",user_router);
app.use("/pet",pet_routes);
app.use("/product",product_routes);
app.use("/admin",admin_Routes)
app.use("/doctor",doctor_Routes)
app.use("/schedule",schedule_router);
app.use("/appointment", appointment_router);
app.use("/report",report_router);
app.use("/order", order_router);
app.use("/feedback",feedbac_router);
app.use("/notificataion",notify_router)

module.exports  = app;