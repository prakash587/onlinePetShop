
const FeedBackModel = require("../Model/productfeedback.model");
const mongoose = require('mongoose');
const UserModel = require("../Model/user.model");
const ProductsModel = require("../Model/products.model");
class FeedBackService{
    findDoctor =async (id)=>{
     let response = await   DoctorModel.find({doctorId:id});
     return response;
    }
    saveFeedback=async(data)=>{
        console.log(data);
        let model = new FeedBackModel(data);
       await model.save(); 
        return model;
    }
    getFeedBack = async (id)=>{
        const response  = await FeedBackModel.find({productId:id}).populate('productId').populate({path:'userId',select:'name image'});
        return response;
    }

    findAverage = async(id)=>{
     console.log(id);
        const average = await FeedBackModel.aggregate([
            { $match: { productId:new mongoose.Types.ObjectId(id) } }, // Match by doctorId
            {
              $group: {
                _id: null,
                averageRating: { $avg: '$rating' } // Calculate average of the 'rating' field
              }
            }
          ]);

        
            if (average.length > 0) {
              console.log('Average Rating:', average[0].averageRating);
              return average[0].averageRating; // Return the average rating
            } else {
              console.log('No ratings found for the doctor ID:', id);
              return null;
            }
          
        // const average =await FeedBackModel.find({doctorId:id}).then((value)=>{

        // });
        // console.log(average);
    }
    updateRating = async(reslt,prodID)=>{
      // JSON.parse()

      let avg = Math.floor(reslt);
      // console.log(newNum)
      
      const response = await ProductsModel.findOneAndUpdate({_id:prodID},{ $set: { rating: avg } },
        { new: true });
       
      return response;

    }



}
module.exports = FeedBackService;