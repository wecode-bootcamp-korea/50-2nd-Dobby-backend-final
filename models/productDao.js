const appDataSource = require('./dataSource');

const findProduct = async (productId) => {
      const product = await appDataSource.query(`
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.image, 
        p.content, 
      IFNULL(ROUND(AVG(c.score), 1),0) as average_score
      FROM products p
      LEFT JOIN comments c ON p.id = c.products_id
      WHERE p.id = ${productId}
      GROUP BY p.id
      `)
      return product
};

module.exports = { findProduct }