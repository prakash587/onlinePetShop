const TimeTableModel = require("../Model/timeslot.model");
const AppointmentModel = require("../Model/appointment.model");
const DoctorModel = require("../Model/doctor.model");
class AppointmentServices{
    appointmentAdd = async({doctorId,date,timeslotId})=>{
      console.log(doctorId,date,timeslotId)
    
        //   console.log(timeslotId);
    const result = await TimeTableModel.findOneAndUpdate(
        {
          doctorId: doctorId,
          date: date,
          'timeslot._id':timeslotId,
        //    Use 'timeslot._id' to match the timeslot by ID
        } ,
        {
            $set:{
                'timeslot.$.booked': true
            },
            
        },
        {
            new:true
        }
      )
     const findIndex=(timeslotId,result)=>{
        // console.log(result,timeslotId);
        for(let i=0; i<result.timeslot.length;i++){
            console.log(result.timeslot[i]._id.toString());
            if(result.timeslot[i]._id.toString()===timeslotId){
                return i;
            }
          }

      }
      let index;
      let newResult;
      if(result){
         index = findIndex(timeslotId,result);
       newResult = result.timeslot[index];
        return newResult;
      }else{
        return;
      }
      
    //   console.log(newResult);
      
         
    //   return newResult;
      
   
   
      
    }
    saveAppointment = async(result)=>{
      
      const response = new AppointmentModel(result).save();
      return response;
  }
  checkIfBooked = async(id)=>{
    const response = AppointmentModel.find({
      timeslotId:id

    });
    return response;
  }
  findDoctorName  = async (id)=>{
    console.log("Here is id",id);
   const response = await DoctorModel.find({doctorId:id});
   console.log(response[0].name);
   return response[0].name;
  }

  getAllAppointment = async (id,role)=>{
    let detectId = "";
    if(role==="doctor"){
      let resp = await AppointmentModel.find({doctorId:id});
      return resp;
      
    }else if (role ==="user"){
      let resp = await AppointmentModel.find({patientId:id});
      return resp;
    }
    

  }

}
module.exports = AppointmentServices;