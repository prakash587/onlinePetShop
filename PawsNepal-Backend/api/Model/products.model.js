const mongoose = require("mongoose");
const productsSchemaDef = new mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: String,

    },
    age: {
        type: Number,
        default:null
    },
    breed: {
        type: String,
        default:null
    },
    materials: {
        type: String,
        
        default:null
    },
    size: {

        type: Number,
        default:null
    },
    brand: {
        type: String,
        default:null
    },
    weight: {
        type: Number,
        default:null
    },
    price: {
        type: Number,
        default:null
    },
    description: {
        type: String,
        default:null
    },
    protein: {
        type: Number,
        default:null
    },
    fat: {
        type: Number,
        default:null
    },
    careInstruction: {
        type: String,
        default:null
    },
    sex: {
        type: String,
        default:null
    },
    fiber: {
        type: Number,
        default:null
    },
    moisture: {
        type: Number,
        default:null
    },
    ingredients: {
        type: String,
        default:null
    },
    image: {
        type: String,
    },
    producttype: {
        type: String,
        
    },
    rating: {
        type: Number,
        default: 5
    }


}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,

})


const ProductsModel = mongoose.model("Product", productsSchemaDef)
module.exports = ProductsModel;