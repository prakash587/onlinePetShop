const Joi = require("joi");

const timetableSchema = Joi.object({
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    booked: Joi.boolean().default(false),
  });
const scheduleValidatorSchema = Joi.object({
  date: Joi.date().required(),
  timeslot: Joi.array().items(timetableSchema).required(),

}).options({abortEarly:false})

module.exports ={scheduleValidatorSchema};