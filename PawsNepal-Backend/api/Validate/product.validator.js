const Joi = require('joi');

// Define the Joi validation schema
const petFoodSchemaValidation = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    weight: Joi.number(),
    price: Joi.number().required(),
    description: Joi.string().required(),

    protein: Joi.number().required(),
    fat: Joi.number().required(),
    fiber: Joi.number().required(),
    moisture: Joi.number().required(),
    ingredients: Joi.string().required(),
    image: Joi.string()
  }).options({abortEarly:false});

  const productsValidateSchema = Joi.object({
    name:Joi.string().required(),
    category:Joi.string().required(),
    description:Joi.string().required(),
    image:Joi.string(),
    price:Joi.number().required(),
    producttype:Joi.string().required(),
    weight: Joi.number(),
    protein: Joi.number(),
    fat: Joi.number(),
    fiber: Joi.number(),
    moisture: Joi.number(),
    ingredients: Joi.string(),
    age: Joi.number(),
    size: Joi.number(),
    breed:Joi.string(),
    materials:Joi.string(),
    brand:Joi.string(),
    careInstruction:Joi.string(),
    sex:Joi.string(),

  }).options({abortEarly:false})

const petValidationSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    age: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    breed:Joi.string().required(),
    image: Joi.string()
}).options({abortEarly:false});

const petAccessoriesSchemaValidation = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    materials: Joi.string().required(),
    size: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string()
  }).options({abortEarly:false});
 
const orderValidationSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required()
})).required(),
    totalprice: Joi.number().required(),
    houseNumber: Joi.string().required(),
    streetName: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    zone: Joi.string().required(),
    contactNumber: Joi.string().required()
}).options({abortEarly:false});



  
module.exports = {petValidationSchema,petFoodSchemaValidation,petAccessoriesSchemaValidation,orderValidationSchema,productsValidateSchema};
