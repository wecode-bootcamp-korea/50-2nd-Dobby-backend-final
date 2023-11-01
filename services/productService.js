const productDao = require('../models/productDao')

const getProduct = async (productId) => {
        const product = await productDao.findProduct(productId);
        return product;
} 

module.exports = { getProduct }