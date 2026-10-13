const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const { showHome } = require("./controllers/homeController.js");
const { checkAuth } = require("./middleware.js");

const productsRoute = require("./routes/productRoutes.js");
const usersRoute = require("./routes/userRoutes.js");
const cartRoute = require("./routes/cartRoutes.js");
const ordersRoute = require("./routes/orderRoutes.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

const port = 8080;

async function connectToMongoDB() {
    await mongoose.connect('mongodb://127.0.0.1:27017/E-Shop');
}

connectToMongoDB()
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    })

app.get("/", checkAuth, showHome);

app.use("/products", productsRoute);

app.use("/users", usersRoute);

app.use("/cart", cartRoute);

app.use("/orders", ordersRoute);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})