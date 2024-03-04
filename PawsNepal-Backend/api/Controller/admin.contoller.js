const logger = require("../../config/logger");
const AdminService = require("../Service/admin.service")
const admin_srvc = new AdminService();

class AdminController{
    getDoctorRequests =async (req,res,next)=>{
        logger.http("GET admin/requesdoctorList");
        const query = req.query.state;
        console.log(req.query.name);
        try{
            let doctorRequestList = await  admin_srvc.listDoctorRequest(query);
            if(!doctorRequestList|| doctorRequestList.length ==0){
                res.json({
                    result:null,
                    message:`No list of ${query} category found`,
                    state:false
                })
            }else{
                res.json({
                    result:doctorRequestList,
                    message:`Successfully fetched ${query} list`,
                    state:true
                })
            }
;        }catch(error){
            next(error);
        }
    }

    approveDoctor  =async(req,res,next)=>{
        try{
            const id = req.params.id;
            const query = req.query.state;
            console.log("Hello wrodl");
            console.log(query);
            
            
            let approvedoc =await admin_srvc.approveDoctor( id,query);
            

            if(query ==='approved'){
                let addDoctor = await admin_srvc.changeRole(id);
                res.send({
                    result:approvedoc,
                    state:true,
                    message:"Successfully approved"
                });
            }else if(query ==="rejected"){
               res.send({
                result:approvedoc,
                status:true,
                message:"Successfully rejected"
               })
                
            }
            
            

        }catch(error){
            next(error);
        }

    }
    getAllDoctor = async(req,res,next)=>{
        try{
            const response = await admin_srvc.fetchDoctor();
            console.log(response);
            if(response.length>0|| response !==null){
                res.send(
                    {
                        result:response,
                        message:"Successfully fetched",
                        status:true
                    }
                );
            }else{
                next({
                    result:null,
                    message:"No doctor Found",
                    status:false
                })
            }
            

        }catch(err){
            next(err);
        }

    }

    deleteDoctor = async(req,res,next)=>{
        try{
            const doctorId = req.params.id;
            const response = await admin_srvc.removeDoctor(doctorId);
            console.log(response);
            res.send({
                result:response,
                message:`id name ${response.name} Successfully deleted`,
                status:true
            })
        }catch(err){
            next(err);
        }
    }
}
module.exports = AdminController