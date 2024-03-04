
const mongoose = require("mongoose");
const UserSchemadef = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        enum:["admin","user","doctor"],
        default: "user"
    },
    image:{
        type: String,
    },
    address:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true,
    autoCreate:true,
    autoIndex:true,
    
})


const UserModel = mongoose.model("User", UserSchemadef)
module.exports = UserModel;