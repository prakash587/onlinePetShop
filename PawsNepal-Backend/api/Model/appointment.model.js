const mongoose = require("mongoose");
const AppointmentSchemaDef = new mongoose.Schema({
    patientName:{
        type:String,
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    startTime:{
        type:String,
    },
    doctorName:{
        type:String,

    },
    endTime:{
        type:String
    },
    status:{
        type:String,
        enum:["Pending","Cancelled","Comleted","Rescheduled"],
        default:"Pending"
    },
    timeslotId:{
        type:String
    }
},{
    timeseries:true,
    autoIndex:true
});

const AppointmentModel = mongoose.model("Appointment",AppointmentSchemaDef);
module.exports = AppointmentModel;
