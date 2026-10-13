const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    priceAtPurchase: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };