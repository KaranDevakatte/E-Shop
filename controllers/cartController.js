const { Cart } = require("../models/cart.js");
const { Product } = require("../models/products.js");
const { Order } = require("../models/orders.js");

const showCart = async (req, res) => {
    const user = req.user;
    const cartItems = await Cart.find({user: user._id}).populate("product");

    res.render("cart.ejs", { cartItems, user:req.user });
}

const placeOrder = async (req, res) => {
    const user = req.user;
    const cartItems = await Cart.find({
        user: user._id
    });
    for(let cartItem of cartItems) {
        const product = await Product.findById(cartItem.product);
        const newOrder = new Order({
            user: user._id,
            product: product._id,
            quantity: cartItem.quantity,
            priceAtPurchase: product.price
        });
        await newOrder.save();
    }
    await Cart.deleteMany({ user: user._id });
    res.redirect("/orders/success");
}

const addToCart = async (req, res) => {
    const { productId } = req.params;
    const user = req.user;
    const cartItem = await Cart.findOne({user: user._id, product: productId});
    if(!cartItem) {
        const newCartItem = new Cart({
            user: user._id, product: productId
        });
        await newCartItem.save();
    }
    res.redirect(`/products/${productId}`);
}

const updateCart = async (req, res) => {
    const { action } = req.body;
    const { productId } = req.params;
    const user = req.user;
    const cartItem = await Cart.findOne({user: user._id, product: productId});
    if(action==="increase") {
        cartItem.quantity++;
        await cartItem.save();
    }
    else if(action==="decrease") {
        if(cartItem.quantity>1) {
            cartItem.quantity--;
            await cartItem.save();
        }
    }
    res.redirect("/cart");
}

const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const user = req.user;
    await Cart.findOneAndDelete({user: user._id, product: productId});
    res.redirect("/cart");
}

module.exports = { showCart, placeOrder, addToCart, updateCart, removeFromCart };