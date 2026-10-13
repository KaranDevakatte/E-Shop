const { Product } = require("../models/products.js");

const { Cart } = require("../models/cart.js");

const showProducts = async (req, res) => {
    const { category } = req.query;
    let products;
    if(!category) {
        products = await Product.find({});
        return res.render("products/index.ejs", { products, category, user: req.user });
    }
    products = await Product.find({ category });
    return res.render("products/index.ejs", { products, category, user: req.user  });
}

const showProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    let isProductInCart;
    if(req.user) {
        const cartItem = await Cart.findOne({user: req.user._id,product: product._id});
        isProductInCart = cartItem;
    }
    res.render("products/view.ejs", { product, user: req.user, isProductInCart });
}

module.exports = { showProducts, showProduct };