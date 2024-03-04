const mongoose = require("mongoose");
const TimetableSchemadef = new mongoose.Schema({ 
    startTime:{
        type:String,
    },
    endTime:{
        type:String
    },
    booked:{
        type:Boolean,
        default:false
    }
});

const doctorAvilabilitySchema = new mongoose.Schema({
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    date:{
        type:Date,
    },
    timeslot: [TimetableSchemadef]
})


const TimeTableModel = mongoose.model("DoctorSchedule",doctorAvilabilitySchema);
module.exports = TimeTableModel;