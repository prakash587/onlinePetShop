const mongoose = require("mongoose");
const OrderSchemaDef = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    products: [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        quantity: { type: Number, default: 1 }
    }],
    totalprice: {
        type: Number,
        required: true
    },
    houseNumber: {
        type: String,
        required: true
    },
    streetName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    }


}, { timestamps: true, autoIndextrue: true, });

const OrderModel = mongoose.model("Order", OrderSchemaDef);
module.exports = OrderModel;