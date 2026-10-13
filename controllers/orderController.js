const { Order } = require("../models/orders.js");

const { Product } = require("../models/products.js");

const showOrders = async (req, res) => {
    const user = req.user;
    const orderItems = await Order.find({user: user._id}).populate("product").sort({ createdAt: -1 });
    res.render("orders.ejs", { orderItems, user:req.user });
}

const showOrderSuccess = (req, res) => {
    res.render("success.ejs", { user:req.user });
}

const buyNow = async (req, res) => {
    const { productId } = req.params;
    const user = req.user;
    const product = await Product.findById(productId);
    const newOrder = new Order({
        user: user._id,
        product: productId,
        priceAtPurchase: product.price
    });
    await newOrder.save();
    res.render("success.ejs", { user: req.user });
}

module.exports = { showOrders, showOrderSuccess, buyNow };