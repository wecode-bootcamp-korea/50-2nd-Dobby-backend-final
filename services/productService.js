const productDao = require('../models/productDao');

const getAllProducts = async () => {
  const newProducts = await productDao.getNewProducts();
  const bestProducts = await productDao.getBestProducts();
  const mdRecommendation = await productDao.getMDRecommendations();

  return { newProducts, bestProducts, mdRecommendation };
};

module.exports = { getAllProducts };
