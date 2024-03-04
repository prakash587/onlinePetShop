const express = require("express");
const UserController = require("../api/Controller/user.controller");
const user_controller = new UserController();
const uploader = require("../api/Middleware/uploader.middleware");
const letLogoinCheck = require("../api/Middleware/login.middleware");
const { isUser } = require("../api/Middleware/rabc.middleware");
const userRouter = express.Router();

userRouter.route("/signup")
    .post(uploader.single("image"),user_controller.userSignup)
userRouter.route("/login")

    .post(user_controller.userLogin)
userRouter.route("/applyasdoctor")

    .post(letLogoinCheck,isUser,uploader.array("document"),user_controller.applyAsDoctor);

module.exports = userRouter;