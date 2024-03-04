const OrderModel = require("../Model/order.model")
class OrderService{

    addOrder = async(data)=>{
        // console.log(data)
        let result = new OrderModel(data);
        await result.save();
        return result;
    }
    fetchOrders = async()=>{
        let result =await OrderModel.find().populate({path:'userId',select:'name image '}).populate('products.productId');
        return result;
    }
    fetchIndividualOrder= async (id)=>{
        let result = await OrderModel.find({userId:id}).populate('products.productId');
        return result;
    }
    
}
module.exports = OrderService;