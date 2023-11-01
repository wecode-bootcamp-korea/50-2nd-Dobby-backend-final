const express = require('express');
const productRouter = express.Router()

const productController = require('../controllers/productController')

productRouter.get('/:product_id',productController.viewProductController)//실행

module.exports = { productRouter }