const logger  = require("../../config/logger");
const {petAccessoriesSchemaValidation} = require("../Validate/product.validator")
const PetAccessoriesService = require("../Service/petaccessories.service");
const pet_acc_svc = new PetAccessoriesService();
class PetAccessoriesController{
    addPetAccessories = async(req,res,next)=>{

        logger.http("POST /pet/createpetfood")
        // let data = req.body;
        let {error,value} =petAccessoriesSchemaValidation.validate(req.body);
        
        try{
            if(error){
                next(
                    error
                )
            }else{
                value.image = req.file.filename;
                console.log("value",value);
                // console.log(data);
                const results  = await pet_acc_svc.createPetAccessories(value);
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
module.exports = PetAccessoriesController;