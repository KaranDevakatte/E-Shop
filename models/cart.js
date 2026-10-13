const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref : "User"
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
        default : 1,
        min: 1
    },
    
}, {timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };