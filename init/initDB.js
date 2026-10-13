const mongoose = require("mongoose");
const { Product } = require("../models/products.js");
const { productData } = require("./data.js");

async function connectToMongoDB() {
    await mongoose.connect('mongodb://127.0.0.1:27017/E-Shop');
}

async function initDB() {
    await Product.deleteMany({});
    await Product.insertMany(productData);

    console.log("Products inserted successfully");
}

connectToMongoDB()
    .then(() => {
        console.log("MongoDB connected successfully");
        return initDB();
    })
    .catch((err) => {
        console.log(err);
    })