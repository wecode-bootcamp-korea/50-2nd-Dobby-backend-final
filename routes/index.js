const express = require('express');
const routes = express.Router(); 

const productRouter = require("./productRouter")

routes.use('/products', productRouter.productRouter)

module.exports = routes;