const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductDetail); //실행
router.get("/productlist", productController.getProductList);

module.exports.router = router;
