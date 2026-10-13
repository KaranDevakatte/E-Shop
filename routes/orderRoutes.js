const express = require("express");

const router = express.Router();

const { showOrders, showOrderSuccess, buyNow } = require("../controllers/orderController");

const { isLoggedIn } = require("../middleware.js");

router.get("/", isLoggedIn, showOrders)

router.get("/success", isLoggedIn, showOrderSuccess)

router.post("/:productId", isLoggedIn, buyNow)

module.exports = router;