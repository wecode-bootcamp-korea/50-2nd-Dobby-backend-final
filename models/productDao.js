const appDataSource = require("./dataSource");

const getAllProducts = async (req, res) => {
  const result = await appDataSource.query(
    `SELECT p.id , p.image , p.name , p.price , AVG(c.score) AS score , count(c.id) AS commentCount 
    FROM products p 
    JOIN comments c 
    ON p.id = c.products_id 
    GROUP BY p.id , p.image , p.name , p.price`
  );
  return result;
};

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
  `);
  return product;
};

module.exports = {
  getAllProducts,
  findProduct,
};
