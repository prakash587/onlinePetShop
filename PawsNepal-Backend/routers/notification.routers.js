const express = require("express");
const notificationRoute = express.Router();
const NotificationController = require("../api/Controller/notification.controller");
const notificationController  = new NotificationController();
const letLoginCheck = require("../api/Middleware/login.middleware")

notificationRoute.route("/get-notificataion")
    .get(letLoginCheck,notificationController.getNotificataion);

    
module.exports = notificationRoute; 