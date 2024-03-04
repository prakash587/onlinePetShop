const mongoose = require("mongoose");
const FeedbackSchemaDef = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },

    // userImage:{
    //     type:String
    // },
    // username:{
    //     type:String,
    // },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
    }
},{
    timeseries:true,
    autoIndex:true
});
const FeedBackModel = mongoose.model("Feedback",FeedbackSchemaDef);
module.exports = FeedBackModel;