const express = require("express");
const feedbackRouter = express.Router();
const FeedbackControler = require("../api/Controller/feedback.controller");
const feedback_Ctrl  = new FeedbackControler();
const letLoginCheck = require("../api/Middleware/login.middleware")
const {isUser} =require("../api/Middleware/rabc.middleware")

feedbackRouter.route("/create-feedback/:id")
    .post(letLoginCheck,isUser,feedback_Ctrl.feedBack);
feedbackRouter.route("/get-feedback/:id")
    .get(feedback_Ctrl.getFeedBack)

    
module.exports = feedbackRouter