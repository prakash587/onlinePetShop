const logger = require("../../config/logger")
const {orderValidationSchema} = require("../Validate/product.validator")
const OrderService = require("../Service/order.service");
const order_service= new OrderService();
const {ADMIN_ID} = require("../../config/constant")
const NotificationService = require("../Service/notification.service")
const notificataion_srvc = new NotificationService();
class OrderController{
    createOrder =async(req,res,next)=>{
        logger.http("POST create-order")
        try{
            const {error,value} =   orderValidationSchema.validate(req.body);
            console.log("value is here",value);
            
            if(error){
                next(error)
            }else{
                const user = req.auth_user;
                
                // console.log(user.name)
                // console.log(user);
             const data = {
                userId:user._id,
                products:value.products,
                totalprice:value.totalprice,
                houseNumber:value.houseNumber,
                streetName:value.streetName,
                city:value.city,
                district:value.district,
                zone:value.zone,
                contactNumber:value.contactNumber
             }
             
                
            //  console.log(data);
               const response = await order_service.addOrder(data);
               console.log(ADMIN_ID);
               await notificataion_srvc.createNoticiation(ADMIN_ID,"New Order",`${user.name} Order new product`)
               await notificataion_srvc.createNoticiation(user._id,"Your Order",`You orderd new Product}`)
               res.send({
                result:response,
                message:"Successfully added",
                status:true
               })

            }

        }catch(err){
            next(err)
        }
        

    }
    getAllOrder = async(req,res,next)=>{
        logger.http("GET /order/get-all-order")
        try{
            const response =await order_service.fetchOrders();
            console.log(response);
            res.send({
                result:response,
                message:"Successfully fetched",
                status:true
            })

        }catch(err){
            next(err)
        }

        
    }
    getIndividualOrder= async (req,res,next)=>{
        try{
            const userId = req.params.id;
            const response = await order_service.fetchIndividualOrder(userId);
            console.log(response);
            res.send({
                result:response,
                message:"Successfully fetched",
                status:true
            })
        }catch(err){
            next(err);

        }

    }

}
module.exports =OrderController