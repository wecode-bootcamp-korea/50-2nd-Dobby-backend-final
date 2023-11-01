const productService = require('../services/productService')

const reviewService = require('../services/reviewService')

const getProductDetail = async (req, res) => {
    try {
        const productId = req.params.productId 
        const [product] = await productService.getProduct(productId);
        if(product === undefined) return res.status(404).json({message:'PRODUCT_NOT_FOUND'});
        const review = await reviewService.findReview(productId);
        if(review[0].id === null) return res.status(200).json({product});
        res.status(200).json({product, review});
    } catch (err) {
        console.error(err);
    }
}

module.exports = { getProductDetail }