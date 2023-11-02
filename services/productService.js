const productDao = require("../models/productDao");

const getAllProductsList = async (req, res) => {
  const result = await productDao.getAllProducts();

  return result;
};

const getAllProducts = async () => {
  const newProducts = await productDao.getNewProducts();
  const bestProducts = await productDao.getBestProducts();
  const mdRecommendation = await productDao.getMDRecommendations();

  return { newProducts, bestProducts, mdRecommendation };
};

const getProduct = async (productId) => {
  const product = await productDao.findProduct(productId);
  return product;
};

module.exports = {
  getAllProductsList,
  getAllProducts,
  getProduct,
};
