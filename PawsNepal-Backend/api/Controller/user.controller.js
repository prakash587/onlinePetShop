const logger = require("../../config/logger");
const {userSignupSchema,userloginValidation} = require("../Validate/user.validator")
const {generateToken} = require("../../config/jwt")
const UserService = require("../Service/user.service");
const user_service = new UserService;
const {doctorApplyValidationSchema} = require("../Validate/doctor.validator");
const NotificationService = require("../Service/notification.service")
const notificatin_svc = new NotificationService();

class UserController{
    userSignup =async (req,res,next)=>{
        logger.http("POST /user/signup")
        // console.log(req.file.filename);

        const {error, value} =  userSignupSchema.validate(req.body);
        console.log(value);
        console.log(value.image)
        try{

            if(error){
                next({
                    status:400,
                    message:error.message
    
                });
            }else{
                
                value.image = req.file.filename;
                const userCheck = await user_service.findUserWithEmail(value["email"]);
                if(userCheck){
                    next({
                        status:404,
                        message:"User Already Exist"
                    })

                }else{
                    const data =  await user_service.createUser(value);
                    let token = generateToken({
                        
                            id:data._id,
                            name: data.name,
                            email:data.email,
                            role:data.role
                           
                    })
                    console.log("here is data",data);
                    
                   await notificatin_svc.createNoticiation(data._id,"Welcome to our app","You have signup to this app")
                    res.json({
                        result:{
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        image: data.image,
                        address: data.address,
                        verified: data.verified,
                        _id: data._id,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        __v: data.__v
                        },
                        token:token,
                        status:true,
                        message:"User Created Successfully"

                    });
                }       
            }
        }catch(error){
            next(error)
        }
    }
    userLogin =async (req,res,next)=>{
        logger.http("POST /user/login")
       
            try{
                const {error,value} = userloginValidation.validate(req.body);
                
                if(error){
                    
                    next(error);
                }else{
                    const user =await user_service.loginService(value.email, value.password);
                    res.send(
                        user
                    );

                }
            }catch(err){
                logger.error(err);
                next(err);
            }
        

    }
    applyAsDoctor =async (req,res,next)=>{
        logger.http("POST /user/applyasdoctor");
        const user = req.auth_user;
        // console.log(user);
        const {error, value } = doctorApplyValidationSchema.validate(req.body);
        try{
            if(error){
                throw error;
            }else{
                if(req.files){
                    let images =[];
                    req.files.map((image)=>{
                    images.push(image.filename);
            })
            console.log(user._id);
            value.name = user.name;
            value.email = user.email;
            value.document=  images;
            value.doctorId = user._id.toString();
            value.image = user.image;
        }
        const checkIfRequestExist = await user_service.checkIfRequestExist(user._id);
        if(checkIfRequestExist.length !==0){
            next({
                result:null,
                message:`Your request is on ${checkIfRequestExist[0].verified} state`,
                state:false
            })
        }else{
            const response =await user_service.doctorRegister(value);
            res.send(
                {
                    result:response,
                    message:"Successfully Applied ",
                    status:true
                }
            );
        }
               

            }

        }catch(err){

            next(err);
        }     
    }
}
module.exports = UserController;