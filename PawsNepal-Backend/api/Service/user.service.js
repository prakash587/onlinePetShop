const UserModel  = require("../Model/user.model")
const bcrypt = require("bcrypt")
const {generateToken} = require("../../config/jwt");
const DoctorModel = require("../Model/doctor.model")
const createError = require("http-errors");
class UserService {
    getUserById = (user_id)=>{
        try{
            return UserModel.findById(user_id);
        }catch(error){
            throw error;
        }
    }
    loginService = async(email,password)=>{
        try{
            const user = await UserModel.findOne({email:email});
            if(!user){
                throw createError.NotFound("User Dosn't exist!");
            }else{
                const comparePassword = bcrypt.compareSync(password , user.password);
                if(comparePassword){
                    let response = {
                        user:user,
                        token: generateToken({
                            id:user._id,
                            name: user.name,
                            email:user.email,
                            role:user.role
                        })
                    }
                    return response;
                }else{
                    throw createError.Unauthorized("Wrong password");
                }
            }
        }catch(err){
            throw err;
        }
    }
    checkIfRequestExist


    findUserWithEmail = async(email)=>{
        try{
            let result = UserModel.findOne({email:email});
            return result;

        }catch(error){

            
            throw error;
        }
    }
    createUser =async(data)=>{
        try{
            data['password']=bcrypt.hashSync(data["password"],10);
            console.log(data['password']); 
            let user_create =  new UserModel(data);
            return user_create.save();
            
        }catch(error){
            throw error;
        }
    }
    checkIfRequestExist = async(id)=>{
        const response = DoctorModel.find({"doctorId":id});
        return response;
    }
    doctorRegister = async(data)=>{
        const doctor = new DoctorModel(data);
        doctor.save();
        return doctor;      
    }
}
module.exports = UserService;