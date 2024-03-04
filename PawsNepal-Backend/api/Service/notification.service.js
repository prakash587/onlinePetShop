const NotificationModel = require("../Model/notification.model");

class NotificationService {
    createNoticiation = (userId,title, message,)=>{
        const result = new NotificationModel({
            userId: userId,
            title:title,
            message: message,
        })
        result.save();
    }
    fetchNotification  = (Id)=>{
        const result = NotificationModel.find({userId:Id})
        return result;
    }
    fetchNotificationDoctor  = (Id)=>{

        const result = NotificationModel.findById({doctorId:Id})
        return result;
    }
    createNoticiationDoctor = (doctorId,title,message,)=>{
        const result = new NotificationModel({
            doctorId: doctorId,
            title:title,
            message: message,
            
        })
        result.save();


        
    }


}
module.exports = NotificationService;