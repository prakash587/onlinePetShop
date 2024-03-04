const { Console } = require("winston/lib/winston/transports");
const logger = require("../../config/logger");
const FeedBackService = require("../Service/feedback.service");
const { feedbackValidationSchema } = require("../Validate/feedback.validator");
const feedback_srvc = new FeedBackService();
const mongoose = require("mongoose")
class FeedbackController{
    feedBack =async (req,res,next)=>{
        logger.http("/feedback/:id");
        try{
            let {error ,value} = feedbackValidationSchema.validate(req.body);
            const prodID = req.params.id;
            console.log("PRODiD",prodID)
            // console.log(query)
            // console.log(value);
            let userId  = req.auth_user;
            // console.log(userId.image);
            if(error){
                next(error);
            }else{
                
                // let findDoctorName = await feedback_srvc.findDoctor(doctorId);
                let submitData = {
                    userId: userId._id,
                    productId:prodID, // Convert prodID to ObjectId
                    rating: value.rating,
                    comment: value.comment
                }
                console.log(submitData)
                const response = await feedback_srvc.saveFeedback(submitData);
                const reslt = await feedback_srvc.findAverage(prodID);
                console.log(reslt)
                // console.log(reslt);
                // console.log("average",reslt);
                
                const updateRating = await feedback_srvc.updateRating(reslt,prodID);
                // console.log(updateRating)
                res.send({
                    result:response,
                    message:"Successfully sent",
                    status:true
                });
                // console.log(rating);
                
            }
            
            

        }catch(error){
            next(error);
        }
        
    }
    
    getFeedBack = async(req,res,next)=>{
        const prodId = req.params.id;
        // console.log(doctorId);
        try{
            let response = await feedback_srvc.getFeedBack(prodId);
            if(response.length===0|| response===null){
                next({
                    result:null,
                    message:"No feedback",
                    status:false
                })
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
module.exports = FeedbackController;