const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/productlist', productController.getProductList);

module.exports.router = router;