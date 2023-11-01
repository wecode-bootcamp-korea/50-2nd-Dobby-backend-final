const { appDataSource } = require('./dataSource');

const findReviewByProductId = async (productId) => {
      const reviews = appDataSource.query(`
      SELECT 
        C.id, 
        C.content, 
        C.score,
        date_format(C.created_at,'%y-%m-%d') as created_date, 
        U.nickname 
      FROM products P 
      LEFT JOIN comments C ON P.ID = C.products_id 
      LEFT JOIN users U ON C.users_id = U.ID 
      WHERE P.ID = ${productId}
      `)
      return reviews
};

module.exports = { findReviewByProductId }