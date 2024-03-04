const logger = require("../../config/logger");
const ReportService  = require("../Service/report.service");
const report_srvc = new ReportService();
const UserService = require("../Service/user.service");
const user_srvc = new UserService();
const {reportValidationSchema} = require("../Validate/report.validator");
const NotificationService = require("../Service/notification.service")
const notificataion_srvc = new NotificationService();

class ReportController {
     createReport=async(req,res,next)=>{
        logger.http("/create-report")
        const doctor = req.auth_user;
        const id = req.params.id;
        const data = req.body;
       const appointmentId= req.query.appointmentid;
       console.log(appointmentId);
        
        try{
            let {error,value} = reportValidationSchema.validate(req.body);
            // const reportGenerate =  report_srvc.addReport(doctor,id);
            const doctorname = doctor.name;
            const patient =await user_srvc.getUserById(id);
            const patientId = patient._id;
            const patientName = patient.name;
            const doctorId = doctor._id;
            
            const date = Date.now();
            if(error){
                next(error);
            }else{
                const description = value.description;
            const recommends  = value.recommends;
            const nonrecommendeds = value.nonrecommendeds;
            const diagnosis= value.diagnosis;
            
            const submitData = {
                patientName,
                patientId,
                doctorId,
                date,
                doctorname,
                diagnosis,
                description,
                recommends,
                nonrecommendeds,
                appointmentId
            }

            
            const reportGenerate =await  report_srvc.addReport(submitData);
            await notificataion_srvc.createNoticiation(patientId,"Your Report","You have new Report")
            const changeStatus = await report_srvc.updateStatus(appointmentId);
            
            console.log(changeStatus);

            if(changeStatus.status ==="completed"){
                res.send({
                    result:reportGenerate,
                    message:"Successfully updated",
                    status:true
                })

            }else{
                next({
                    result:null,
                    message:"Problem ",
                    status:false
                })
            }
            }
        }catch(error){
            next(error);
        }
        

    }
    fetchReportfromAppointmentId = async(req,res,next)=>{
        console.log("hello world")
        
        try{
            const appointmentId = req.params.id;
            const findReport = await report_srvc.findReport(appointmentId);
            if(findReport.length>0|| findReport !==null){
                res.send(
                    {
                        result:findReport,
                        message:"Fetched Successfully",
                        status :true
                    }
                )
            }else{
                next(
                    {
                        result:null,
                        message:"No report found",
                        status:false
                    }
                )
            }
        }catch(error){
            next(error);
        }
        
        
    }

}

module.exports = ReportController;