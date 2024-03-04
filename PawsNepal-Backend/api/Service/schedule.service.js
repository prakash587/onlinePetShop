const TimeTableModel = require("../Model/timeslot.model");
class ScheduleService{
    checkAppointmentExist = async(doctorID,date)=>{
        try{

            let result =  await  TimeTableModel.find({doctorId:doctorID ,date:date});
            return result;
            
        }catch(error){
            throw error;
        }
    }
    saveSchedule = async(data)=>{
        console.log(data);
    let response = new TimeTableModel(data);
    response.save();        
    return response;

    }
    fetchAllScheule = async({doctorId,date})=>{
        let id = doctorId;
        console.log(date);
      console.log("date",date)
        let result = await TimeTableModel.find({doctorId:doctorId,date:date});
        console.log(result);
        return result;
    }

}
module.exports = ScheduleService;