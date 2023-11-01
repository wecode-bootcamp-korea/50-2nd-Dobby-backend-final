const { findReview } = require('../models/commentsDao')

const viewReview = async (id) => {
    try {
        const review = await findReview(id);
        return review
        
    } catch(err) {
        console.error(err);
    }    
}


module.exports = { viewReview }