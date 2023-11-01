const reviewDao = require('../models/reviewDao')

const findReview = async (productId) => {
        const review = await reviewDao.findReviewByProductId(productId);
        return review
}

module.exports = { findReview }