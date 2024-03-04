const ReportModel = require("../Model/report.model");
const AppointmentModel = require("../Model/appointment.model")
class ReportService{
    addReport = async(submitData)=>{
      const result =   new ReportModel(submitData);
       result.save();
       
      console.log(result);
       return result;

    }
    updateStatus= async(id)=>{
      console.log("appointment id",id);
      const result =await AppointmentModel.findByIdAndUpdate(
        id,
        { status: 'completed' },
        { new: true } // To get the updated document as the result
      );
      return result;
    }
    findReport = async(id)=>{
      
      const result = await ReportModel.findOne(
        {
          appointmentId :id
        }
      
      );
      console.log(result);  
      return result;
    }
    

}
module.exports= ReportService;