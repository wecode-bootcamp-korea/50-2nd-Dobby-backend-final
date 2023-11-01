const { viewProduct } = require('../services/productService')
const { viewReview } = require('../services/commentsService')


const viewProductController = async (req, res) => {
    const id = req.params.product_id 
    const product = await viewProduct(id)
    if(product.length ===0) return res.status(400).json({message:'PRODUCT_NOT_FOUND'})
    const review = await viewReview(id)
    if(review[0].id === null) return res.status(200).json({product: product[0]})
    res.status(200).json({product: product[0], review: review})
}

module.exports = { viewProductController } //try catch 컨트롤러에서 하면 좋음