const Joi = require("joi")

const userloginValidation = Joi.object({
    email:Joi.string().email().required().trim(),
    password:Joi.string().max(15).min(8).trim().required(),
}).options({abortEarly:false});
const userSignupSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required().trim().lowercase(),
    password:Joi.string().max(15).min(8).trim().required(),
    image:Joi.string(),
    address:Joi.string().required(),
    role:Joi.string().valid(
        'user',
        'admin'
    ),
}).options({abortEarly:false})

module.exports = {userSignupSchema,userloginValidation}