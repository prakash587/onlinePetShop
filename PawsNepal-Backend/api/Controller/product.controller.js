const logger = require("../../config/logger")
const ProductService =require("../Service/product.service")
const product_svc = new ProductService();
const {productsValidateSchema} = require("../Validate/product.validator")
class ProductController{
    createProducts = async(req,res,next)=>{
        logger.http("POST proudct/create-product")
        try{
            let {error,value} = productsValidateSchema.validate(req.body);
            if(error){
                next(error)
            }else{
                value.image = req.file.filename;

                const data = {
                    name:value.name,
                    category:value.category,
                    age:req.body.age,
                    breed:req.body.breed,
                    materials:req.body.materials,
                    size:req.body.size,
                    weight:req.body.weight,
                    brand:req.body.brand,
                    price:value.price,
                    description:value.description,
                    protein:req.body.protein,
                    fat:req.body.fat,
                    careInstruction:req.body.careInstruction,
                    sex:req.body.careInstruction,
                    fiber:req.body.careInstruction,
                    moisture:req.body.moisture,
                    ingredients:req.body.ingredients,
                    image:req.file.filename,
                    producttype:value.producttype

                };
                const response =await product_svc.createProduct(data);
                console.log(response);
                res.send({
                    result:response,
                    status:true,
                    message:"Successfully added"
                })
            }

        }catch(err){
            next(err)
        }

    }
    getAllProducts = async(req,res,next)=>{
        logger.http("GET /product/get-all-product")
        try{ 

            let response = await product_svc.fetchAllProduct();
            
            res.send({
                result:response,
                status:true,
                message:"all data featched",
                
            })

        }catch(err){
            next(err);
        }
    }
    getPetProduct = async(req,res,next)=>{
        logger.http("GET /product/get-pet-product")
        try{
            let response = await product_svc.fetcthPetProduct();
            res.send({
                result:response,
                status:true,
                message:"all data featched",
                
            })

        }catch(err){
            next(err);
        }
    }
    getFoodProduct = async(req,res,next)=>{
        logger.http("GET /product/get-petfood-product")
        try{
            let response = await product_svc.fetcthFoodProduct();
            res.send({
                result:response,
                status:true,
                message:"all data featched",
                
            })

        }catch(err){
            next(err);
        }
    }
    getCategoryProduct = async (req,res,next)=>{
        logger.http("GET /product/get-product-category")

        try{
            const query = req.query.category;
            
            const response =await product_svc.fetchByCategory(query);
            if(response<1){
                next({
                    result:null,
                    message:"Not Avialable",
                    stats:false
                })
            }else{

                res.send({
                    result:response,
                    status:true,
                    message:"Successfully fetched "
                })
            }
            console.log(response)

        }catch(err){
            next(err)
        }
    }
    getProductDetail= async (req,res,next)=>{
        const id = req.params.id;
        try{

            const result = await product_svc.fetchProductDetail(id);
            
        }catch(err){
            next(err);
        }
    }
    getAccessoriesProduct = async(req,res,next)=>{
        logger.http("GET /product/get-petaccessories-product")
        try{
            let response = await product_svc.fetcthAccessoriedProduct();
            res.send({
                result:response,
                status:true,
                message:"all data featched",
                
            })

        }catch(err){
            next(err);
        }
    }
    deleteProduct = async (req,res,next)=>{
        try{
            const id = req.params.id;
            const response = await product_svc.deleteItem(id);
            console.log(response);

            res.send({
                result:response,
                message:"Successfully deleted",
                status:true
            })

        }catch(err){
            next(err)
        }
    }
}
module.exports = ProductController;