const Joi = require("joi");

const feedbackValidationSchema = Joi.object({
    rating:Joi.number().required().max(5).min(0),
    comment:Joi.string().required()

}).options({abortEarly:false});


module.exports ={feedbackValidationSchema};