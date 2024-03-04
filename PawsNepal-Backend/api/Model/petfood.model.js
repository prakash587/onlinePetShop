const mongoose = require("mongoose");
const petFoodSchemadef = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true

  },
  brand: {
    type: String,
    required: true
  },
  weight: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  fat: {
    type: Number,
    required: true
  },
  fiber: {
    type: Number,
    required: true
  },
  moisture: {
    type: Number,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  producttype: {
    type: String,
    default: "petfood"

  },
  rating:{
    type:Number,
    default:5
  }


}, {
  timestamps: true,
  autoCreate: true,
  autoIndex: true,

})


const petFoodModel = mongoose.model("Petfood", petFoodSchemadef)
module.exports = petFoodModel;