const logger  = require("../../config/logger");
const {petFoodSchemaValidation} = require("../Validate/product.validator")
const PetFoodService = require("../Service/petfood.service");
const pet_food_svc = new PetFoodService();
class PetFoodController{
    addPetFood = async(req,res,next)=>{

        logger.http("POST /pet/createpetfood")
        // let data = req.body;
        let {error,value} = petFoodSchemaValidation.validate(req.body);
        
        try{
            if(error){
                next(
                    error
                )
            }else{
                value.image = req.file.filename;
                console.log("value",value);
                // console.log(data);
                const results  = await pet_food_svc.createPetFood(value);
                console.log("Response is htere", results);
                res.send({
                    result:results,
                    status:true,
                    message:"Successfully added",

                });
    
            }

        }catch(err){
            next(err);
        }

    }


}
module.exports = PetFoodController;