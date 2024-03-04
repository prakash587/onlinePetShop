const ScheduleService = require("../Service/schedule.service");
const schedule_srvc = new ScheduleService();
const logger = require("../../config/logger");
const { scheduleValidatorSchema } = require("../Validate/schedule.schema");

class ScheduleController{
    
    createSchedule = async(req,res,next)=>{
        logger.http("POST schedule/create-schedule");
        let {error,value} = scheduleValidatorSchema.validate(req.body);
        try{
            if(error){
                next(error);
            }else{
                let user = req.auth_user._id;
                value.doctorId=user;
                
                let checkIfAppointmentExist = await schedule_srvc.checkAppointmentExist(user,value.date);
                try{
                    if(checkIfAppointmentExist.length !==0){
                        console.log("`you already have added appointment for ${value.date} you can update it!`")
                        next({
                            result:null,
                            message:`you already have added appointment for ${value.date} you can update it!`,
                            status:false
                        });
                    }else{
                        let result =await schedule_srvc.saveSchedule(value).then((data)=>{
                            res.send({
                                result:value,
                                message:"Successfully created",
                                status:true
                            })
                        })
                    }

                }catch(error){
                    
                    next(error);
                }
                
                
            }

        }catch(err){
            next(err);
        }
      
    }
    getAllSchedule = async(req,res,next)=>{
        try{
            logger.http("GET /getallschedule");
            const doctorId = req.params.id;
            const date = req.query.date;
            
            
            let response = await schedule_srvc.fetchAllScheule({doctorId,date});
            console.log("response",response);
            
            if(response.length===0|| response ===null){
                console.log(response);
                next({
                    result:null,
                    message:"No schedule found!",
                    status:false
                })
            }else{
                res.send({
                    result:response,
                    message:"Successfully fetched",
                    status:true
                })
            }

           
        }catch(error){
            next(
                error
            )
        }
        
    }
    
}
module.exports = ScheduleController;