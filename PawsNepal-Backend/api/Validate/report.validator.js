const Joi = require("joi");

const reportValidationSchema = Joi.object({
    // date:Joi.date().required(),
    diagnosis:Joi.string().required(),
    description:Joi.array().items(Joi.string().required()).required(),
    recommends:Joi.array().items(Joi.string().required()).required(),
    nonrecommendeds:Joi.array().items(Joi.string().required()).required(),


}).options({abortEarly:false})
module.exports  = {reportValidationSchema};