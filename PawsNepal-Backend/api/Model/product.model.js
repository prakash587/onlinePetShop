const { string } = require("joi");
const mongoose = require("mongoose");
const petSchemadef = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    breed:{
        type:String,
        required:true
    },

    image: {
      type: String,
    },
    sex: {
      type: String,
    },
    careInstruction: {
      type: String,
    },
    producttype:{
        type:String,
        default:"pet"
            
        }
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const petModel = mongoose.model("Pet", petSchemadef);
module.exports = petModel;
