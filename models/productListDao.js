const { appDataSource } = require('./dataSource');

const getNewProducts = async () => {
  const query = 'SELECT * FROM products ORDER BY created_at DESC LIMIT 10';
  return await appDataSource.query(query);
};

const getBestProducts = async () => {
  const query = 'SELECT * FROM products ORDER BY sales DESC LIMIT 10';
  return await appDataSource.query(query);
};

const getMDRecommendations = async () => {
  const query = 'SELECT * FROM products WHERE id IN (9, 10, 14, 15, 17, 18, 19)';
  return await appDataSource.query(query);
};

module.exports = { getNewProducts, getBestProducts, getMDRecommendations };
