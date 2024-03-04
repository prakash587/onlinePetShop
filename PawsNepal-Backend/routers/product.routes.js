const express =require("express");
const productRoute = express.Router();
const ProductController = require("../api/Controller/product.controller");
const product_ctrl = new ProductController();
const uploader = require("../api/Middleware/uploader.middleware")
const letLoginCheck = require("../api/Middleware/login.middleware")
const {isAdmin} = require("../api/Middleware/rabc.middleware")


productRoute.route("/get-all-product")
    .get(product_ctrl.getAllProducts)
productRoute.route("/get-pet-product")
    .get(product_ctrl.getPetProduct)
productRoute.route("/get-petfood-product")
    .get(product_ctrl.getFoodProduct)

productRoute.route("/get-petaccessories-product")
    .get(product_ctrl.getAccessoriesProduct)

productRoute.route("/get-product-category")
    .get(product_ctrl.getCategoryProduct)
productRoute.route("/product-detail/:id")
    .get(product_ctrl.getProductDetail)
productRoute.route("/create-proudcts")
    .post(letLoginCheck, isAdmin,uploader.single('image'),product_ctrl.createProducts)
productRoute.route("/delete-product/:id")
    .delete(product_ctrl.deleteProduct)
module.exports = productRoute;
