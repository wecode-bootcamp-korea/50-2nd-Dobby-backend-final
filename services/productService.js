const productDao = require('../models/productDao');

const getAllProducts = async () => {
  const newProducts = await productDao.getNewProducts();
  const bestProducts = await productDao.getBestProducts();
  const mdRecommendation = await productDao.getMDRecommendations();

  return { newProducts, bestProducts, mdRecommendation };
};

const getProduct = async (productId) => {
  const product = await productDao.findProduct(productId);
  return product;
} 

module.exports = { getAllProducts,getProduct };




