const express = require("express");
const orderRouter = express.Router();
const OrderController = require("../api/Controller/order.controller");
const order_cntrl  = new OrderController();
const {isUser,isAdmin} = require("../api/Middleware/rabc.middleware")
const letLoginCheck = require("../api/Middleware/login.middleware")

orderRouter.route("/create-order")
    .post(letLoginCheck,isUser,order_cntrl.createOrder);
orderRouter.route("/get-all-order")
    .get(letLoginCheck,isAdmin,order_cntrl.getAllOrder)
orderRouter.route("/get-order/:id")
    .get(order_cntrl.getIndividualOrder)

    
module.exports = orderRouter; 