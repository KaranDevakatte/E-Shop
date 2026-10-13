const express = require("express");

const router = express.Router();

const { showProducts, showProduct} = require("../controllers/productController");

const { checkAuth } = require("../middleware.js");

router.get("/", checkAuth, showProducts)

router.get("/:id", checkAuth, showProduct)

module.exports = router;