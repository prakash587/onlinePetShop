const DoctorService = require("../Service/doctor.service");
const doctor_srvc = new DoctorService();
const logger = require("../../config/logger");
class DoctorsController{
    getAllDoctor = async(req,res,next)=>{
        logger.http("GET /get-all-doctor?find=")
        try{
            let query = req.query.find;
            
            let doctors = await doctor_srvc.findDoctor(query);
            if(doctors.length ===0){
                res.send({
                    result:null,
                    message:"Doctor not found",
                    status:false
                })
            }else{
                const filterData = doctors.map(({ doctorId,name, email, image, rating, specialization, experience }) => ({
                    doctorId,
                    name,
                    email,
                    image,
                    rating,
                    specialization,
                    experience,
                    
                  }));

            res.send({
                result:filterData,
                message:"Doctor fetched Successfully",
                status:true
            })
        }
        }catch(error){
            next(error);
        }
    }
    getDoctorById = async(req,res,next)=>{
        logger.http("GET /get-doctor-by-id/:id");
        try{
            let id = req.params.id;
            let doctorDetail = await doctor_srvc.findDoctorById(id);
            let userDetail = doctorDetail[0][0];
            let doctor = doctorDetail[1][0];
            const response ={
                
                username:userDetail.name,
                email:userDetail.email,
                role:userDetail.role,
                image:userDetail.image,
                address:userDetail.address,
                dob:userDetail.dob,
                joinedAt:userDetail.createdAt,
                specialization:doctor.specialization,
                experience:doctor.experience,
                education:doctor.education,
                rating:doctor.rating,
                document:doctor.document

            }
            console.log(response);
            res.send({
                result:response,
                message:"Successfully fetched",
                status:true
            }
            )

        }catch(error){
            next(error);
        }


    }
    getDoctorByName = async(req,res,next)=>{
        
        try{
            const name = req.query.name;
            console.log("sagar",name);
            const response = await doctor_srvc.findByName(name);
            if(response.length===0|| response===null){
                next(
                    {
                        result:null,
                        message:`no one named ${name}`,
                        status:false
                    }
                )
            }else{
                res.send({
                    result:response,
                    message:"Successfully fetched",
                    status:true
                    
                })
            }

        }catch(error){
            next(error);
        }
    }
}
module.exports = DoctorsController;