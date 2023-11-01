const reviewDao = require('../models/reviewDao')

const findReviewByProductId= async (productId) => {
        const review = await reviewDao.findReviewByProductId(productId);
        return review
}

module.exports = { findReviewByProductId }