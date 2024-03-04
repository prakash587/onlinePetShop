const express = require("express");
const petRouter = express.Router();

const PetController  =require("../api/Controller/pet.controller");

const product_ctrl  = new PetController();
const PetFoodController = require("../api/Controller/petfood.controller");
const petFood_Ctrl = new PetFoodController();
const PetAccessoriesController = require("../api/Controller/petaccessories.controller");
const petacc_ctrl = new PetAccessoriesController();

const uploader = require("../api/Middleware/uploader.middleware")
const letLogoinCheck = require("../api/Middleware/login.middleware")

const {isAdmin, isUser}  = require("../api/Middleware/rabc.middleware");

petRouter.route("/createproduct")
    .post(letLogoinCheck,isAdmin,uploader.single("image"),product_ctrl.addPet)


petRouter.route("/create-pet-food")
    .post(letLogoinCheck,isAdmin,uploader.single("image"), petFood_Ctrl.addPetFood);

petRouter.route("/create-accessories")
    .post(letLogoinCheck,isAdmin,uploader.single("image"),petacc_ctrl.addPetAccessories);

module.exports =petRouter;