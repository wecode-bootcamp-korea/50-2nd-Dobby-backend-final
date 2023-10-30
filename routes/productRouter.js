const express = require('express');
const productController = require('../controllers/productController')

const productRouter = express.Router()

productRouter.get('/:product_id',productController.viewProductController)

module.exports = { productRouter }