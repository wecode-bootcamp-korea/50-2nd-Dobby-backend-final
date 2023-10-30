const { viewReview } = require('../services/commentsService')
const { viewProduct } = require('../services/productService')

const viewProductController = async (req, res) => {
    const id = req.params.product_id 
    const products = await viewProduct(id)
    const comments = await viewReview(id)
    
    res.status(200).json({product: products[0], review: comments})
}

module.exports = { viewProductController } 