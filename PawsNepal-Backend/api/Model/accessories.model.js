const mongoose = require("mongoose");
const petAccessoriesSchemadef = new mongoose.Schema({
    name: {
        type: String,
    },
    category:{
        type:String,

    },
    brand: {
        type: String,
      },
      materials:{
        type:String,
      },
      size:{

        type:Number,
      },
      price: {
        type: Number,
      },
      description: {
        type: String,
      },
      image:{
        type: String,
        },
    producttype:{
        type:String,
        default:"accessories"
        }
},{
    timestamps: true,
    autoCreate:true,
    autoIndex:true,
    
})


const petAccessoriesModel = mongoose.model("accessories", petAccessoriesSchemadef)
module.exports = petAccessoriesModel;