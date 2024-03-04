const PetFoodModel = require("../Model/petfood.model");

class PetFoodService{
    createPetFood = async(data)=>{
        const result = new PetFoodModel(data);
        
        result.save();
        return result;

    }

}
module.exports = PetFoodService;