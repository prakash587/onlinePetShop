const logger = require("../../config/logger");
const {petValidationSchema} = require("../Validate/product.validator");
const PetService = require("../Service/pet.service");
const { resource, response } = require("../../routers");
const pet_svc = new PetService();
class PetController {
    addPet =async (req,res,next)=>{

        logger.http("POST /pet/createpet")
        // let data = req.body;
        let {error,value} = petValidationSchema.validate(req.body);
        
        try{
            if(error){
                next(
                    error
                )
            }else{
                value.image = req.file.filename;
                console.log("value",value);
                // console.log(data);
                const results  = await pet_svc.createPet(value);
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
module.exports = PetController;