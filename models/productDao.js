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

module.exports = {
  getAllProducts,
};
