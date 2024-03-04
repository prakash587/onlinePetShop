const AppointmentServices = require("../Service/appointment.service");
const appointmet_svc = new AppointmentServices();
const logger = require("../../config/logger");
const NotificationService = require("../Service/notification.service")
const notificatin_svc = new NotificationService();

class AppointmentController{
    bookappointment = async(req,res,next)=>{
        logger.http("POST /bookappointment")
        const user = req.auth_user;
        const doctorId = req.params.id;
        const date = req.body.date;
        const timeslotId = req.body.timeId;
        
        console.log(req.body);
       
        try{
            const appointment = await appointmet_svc.appointmentAdd({doctorId,date,timeslotId});
            console.log(appointment);
            if(appointment==null){
                next({
                    result:null,
                    message:"No Appointment of this id",
                    status:false
                })
            }else{
               
                const patientName = user.name;
                const patientId = user._id;
                const SelecteddoctorId = doctorId;

                const doctorName = await appointmet_svc.findDoctorName(SelecteddoctorId);
                console.log(doctorName);
                const startTime = appointment.startTime;
                const endTime = appointment.endTime;
                const timeslotId = appointment._id;
                
                const check = await appointmet_svc.checkIfBooked(timeslotId);
                console.log("check",check);
                
                if(check.length!==0 || check ===null){
                    next(
                    {
                    result:null,
                    message:"This is already booked",
                    status:false}
                    )
                }else{
                    const submitdata = {
                        patientName,
                        patientId,
                        doctorName,
                        doctorId,
                        startTime,
                        endTime,
                        timeslotId
                    }
                    // console.log("submit data",submitdata);
                    const saveappointment = await appointmet_svc.saveAppointment(submitdata);

                    await notificatin_svc.createNoticiation(doctorId,'New Appointment',`${patientName} has booked an appointment`)
    
                    res.send({
                        result:saveappointment,
                        message:"Successfully booked",
                        status:true
                    })

                }
                
            }


        }catch(error){
            next(error);
        }

    }
    listAppointment = async(req,res,next)=>{
        logger.http("GET /get-appointment")
        let user = req.auth_user;
        let role = user.role;
        let id = user.id;
        try{
            const appointmentList = await appointmet_svc.getAllAppointment(id,role);
            if(appointmentList.length===0){
                next({
                  result:null,
                  message:"No Appointment found",
                  status:false
                })
          
              }else{
                res.send({
                  result:appointmentList,
                  message:"Successfully fetched",
                  status:true
                })
              }
        }catch(error){
            next(error);
            
        }

    }
    

}
module.exports = AppointmentController;