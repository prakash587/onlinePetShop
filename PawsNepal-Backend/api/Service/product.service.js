const PetModel = require("../Model/product.model");
const PetFoodModel = require("../Model/petfood.model");
const petAccessoriesModel = require("../Model/accessories.model");
const petFoodModel = require("../Model/petfood.model");
const ProductsModel = require("../Model/products.model");

class ProductService {
    createProduct = async(data)=>{
        let product = new ProductsModel(data);
        product.save();
        return product;
    }

    fetchAllProduct = async()=>{
        let products = await ProductsModel.find()

        

        return products;

    }
    deleteItem = async (id)=>{
        console.log(id);
        let result = ProductsModel.findByIdAndDelete(id);
        return result;
    }
    fetcthPetProduct = async()=>{
        let petData = await PetModel.find();
        if(petData.length<1){
            petData = "No product Avialable"
        }
        return petData;

    }
    fetchByCategory = async(query)=>{
        // let foodProduct =await PetFoodModel.find({category:query})
        // let petAcc =await petAccessoriesModel.find({category:query})
        // let pet =await PetModel.find({category:query})

        let result = await ProductsModel.find({category:query})
        // if(foodProduct.length<1){
        //     foodProduct= "Pet FOOD not Avialable"
        // }
        // if(petAcc.length<1){
        //     petAcc= "Pet Accessories not Avialable"
        // }
        // if(pet.length<1){
        //     pet= "Pet  not Avialable"
        // }
        
        // const result = {foodProduct,petAcc,pet}
        
        return result;
    }

    fetcthFoodProduct = async()=>{
        let petFoodData = await petFoodModel.find();
        if(petFoodData.length<1){
            petFoodData = "No product Avialable"
        }
        return petFoodData;

    }
    fetchProductDetail = async (id)=>{
        let result = await Promise.all([
            PetModel.find({_id:id}),
            PetFoodModel.find({_id:id}),
            petAccessoriesModel.find({_id:id})

        ])
        return result;
    }
    fetcthAccessoriedProduct = async()=>{
        let petAccessoriesData = await petAccessoriesModel.find();
        if(petAccessoriesData.length<1){
            petAccessoriesData = "No product Avialable"
        }

        return petAccessoriesData;

    }
}


module.exports = ProductService;
