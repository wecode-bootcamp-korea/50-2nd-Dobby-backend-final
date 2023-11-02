const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/productlist', productController.getProductList);
router.get('/:productId', productController.getProductDetail)//실행

module.exports.router = router;




