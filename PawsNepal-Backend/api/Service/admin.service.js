const DoctorModel = require("../Model/doctor.model")
const UserModel = require("../Model/user.model")
class AdminService{
    listDoctorRequest =async (query)=>{   
        const data   = await DoctorModel.find({
            verified : query

        });
        return data;
    }
    approveDoctor = async (id,query)=>{
        let result =  await DoctorModel.findOneAndUpdate({doctorId:id}, { verified: query});
        return result;
     }
     changeRole = async (id)=>{
        let role = await UserModel.findByIdAndUpdate(id,{role:"doctor"});
        return role;
     }
     fetchDoctor= async()=>{
        const doctors = await DoctorModel.find({verified:"approved"});
        return doctors;

    }

     removeDoctor = async (id) =>{
        const deleted = await DoctorModel.findByIdAndDelete(id);
        return deleted;

    }

}
module.exports = AdminService;