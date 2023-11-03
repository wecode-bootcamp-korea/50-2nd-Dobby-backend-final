const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.get("/productlist", productController.getProductList);
router.get("/:productId", productController.getProductDetail);

module.exports.router = router;
