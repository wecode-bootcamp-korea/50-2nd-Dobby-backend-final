const express = require('express');
const productRouter = express.Router()

const productController = require('../controllers/productController')

productRouter.get('/:productId', productController.getProductDetail)//실행

module.exports = { productRouter }