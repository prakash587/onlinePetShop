const DoctorModel = require("../Model/doctor.model");

const UserModel = require("../Model/user.model");

class DoctorService{
    findDoctor = async(query)=>{
        if(query==="all"){
           const result =  await DoctorModel.find({verified:"approved"});
           return result;
        }else if(query !=="all"){
            const result = await DoctorModel.find({verified:"approved", specialization:query});
            return result;  
        }
    }
    findDoctorById = async(id)=>{
      let result =   await Promise.all([
        UserModel.find({_id:id}),
        DoctorModel.find({
            doctorId:id
        }) 
      ]);
      console.log(result);
      return result;
      

    }
    findByName = async(text)=>{
      
      const result = await DoctorModel.find({name:{ $regex: text,$options:'i' }});
      return result;


    }

}
module.exports = DoctorService;