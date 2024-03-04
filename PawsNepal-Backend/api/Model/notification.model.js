const mongoose = require("mongoose")
const NotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isGlobal:{
        type:Boolean,
        default:false
    },
    title:{
        type:String,
    },
    message: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const NotificationModel = mongoose.model('Notification', NotificationSchema);
module.exports = NotificationModel;

