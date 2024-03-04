const NotificationService = require("../Service/notification.service");
const notificataion_srvc = new NotificationService();
class NotificationController{
  getNotificataion = async(req,res,next)=>{
    const user = req.auth_user;
    
    

    try{

      const Id = user._id;
      
      const response = await notificataion_srvc.fetchNotification(Id);
      
      res.send({
        result:response,
        message:"Successfully fetched",
        status:true
      })

    }catch(err){
      next(err)
    }

  }
  getNotificataionDoctor = async(req,res,next)=>{
    const doctorId = req.auth_user;
    
    

    try{

      const Id = user._id;
      
      const response = await notificataion_srvc.fetchNotification(Id);
      res.send({
        result:response,
        message:"Successfully fetched",
        status:true
      })

    }catch(err){
      next(err)
    }

  }
  

}
module.exports = NotificationController;