const express = require("express");

const router = express.Router();

const { showCart, placeOrder, addToCart, updateCart, removeFromCart } = require("../controllers/cartController");

const { isLoggedIn } = require("../middleware.js");

router.get("/", isLoggedIn, showCart)

router.post("/orders", isLoggedIn, placeOrder)

router.post("/:productId", isLoggedIn, addToCart)

router.patch("/:productId", isLoggedIn, updateCart)

router.delete("/:productId", isLoggedIn, removeFromCart)

module.exports = router;