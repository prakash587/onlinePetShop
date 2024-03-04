const mongoose = require("mongoose");
const DoctorSchemadef = new mongoose.Schema({
    doctorId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:mongoose.Schema.Types.String,
        ref:"User"

    },
    email:{
        type:mongoose.Schema.Types.String,
        ref:"User"

    },
    specialization:{
        type:String,
        required:true,
    },
    experience:{
        type: Number,
        required:true
    },
    education:{
        type:[{
            instituteName:String,
            grade:String
        }]
    },
    rating:{
        type: Number,
        default: 0,
        max:5,
        min:0   
    },
    image:{
        type:mongoose.Schema.Types.String,
        ref:"User",
    },
    document:[String],
    verified:{
        type:String,
        enum :["pending","approved","rejected"],
        default:"pending"
    }
    
},{
    timestamps: true,
    autoCreate:true,
    autoIndex:true,
    
})


const DoctorModel = mongoose.model("Doctordetail", DoctorSchemadef)
module.exports = DoctorModel;