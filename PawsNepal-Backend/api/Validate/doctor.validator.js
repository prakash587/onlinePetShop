const Joi = require('joi');

const doctorApplyValidationSchema = Joi.object({
    
    specialization: Joi.string().required(),
    experience: Joi.number().required(),
    rating: Joi.number().min(0).max(5),
    education:Joi.array().items(
        Joi.object().keys(
            {
                instituteName:Joi.string(),
                grade:Joi.string()
            }
        )
        ),
    document:Joi.array().items(Joi.string().uri()),
    image:Joi.string(),

}).options({abortEarly:false})

module.exports = {doctorApplyValidationSchema}