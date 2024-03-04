const petAccessoriesModel = require("../Model/accessories.model");4

class PetAccessoriesService {
    createPetAccessories= async(data) =>{
        const result = new petAccessoriesModel(data);
        result.save();
        return result;

    }

}
module.exports = PetAccessoriesService;