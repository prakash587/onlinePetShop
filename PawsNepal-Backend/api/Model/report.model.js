const mongoose = require("mongoose");
const ReportSchemaDef = new mongoose.Schema({
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
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Appointment"
    },
    date:{
        type:Date
    },
    doctorName:{
        type:String
    },
    diagnosis:{
        type:String
    },
    description:{
        type:[String]
    },
    recommends:{
        type:[String]
    },
    nonrecommendeds:{
        type:[String]
    },
},{timestamps:true,autoIndextrue:true,});

const ReportModel = mongoose.model("Report",ReportSchemaDef);
module.exports = ReportModel;