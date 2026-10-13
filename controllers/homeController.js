const { Product } = require("../models/products.js");

const showHome = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(12);
    res.render("home.ejs", { products, user: req.user });
}

module.exports = { showHome };