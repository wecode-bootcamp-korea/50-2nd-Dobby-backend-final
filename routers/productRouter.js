const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.totalProducts);

router.get("/search" , productController.products)

module.exports = { router };
