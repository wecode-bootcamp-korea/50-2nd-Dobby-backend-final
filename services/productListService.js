const productListDao = require('../models/productListDao');

const getAllProducts = async () => {
  const newProducts = await productListDao.getNewProducts();
  const bestProducts = await productListDao.getBestProducts();
  const mdRecommendation = await productListDao.getMDRecommendations();

  return { newProducts, bestProducts, mdRecommendation };
};

module.exports = { getAllProducts };
