const PetModel = require("../Model/product.model")
class PetService{

    createPet = async(data)=>{
        // console.log("Service data",data);
        const result = new PetModel(data);
        
        result.save();
        return result;
        
    }
}
module.exports = PetService;