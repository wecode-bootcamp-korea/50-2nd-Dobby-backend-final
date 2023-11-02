const productDao = require("../models/productDao");

const getAllProducts = async (req, res) => {
  const result = await productDao.getAllProducts();

  return result;
};

const getProduct = async (productId) => {
  const product = await productDao.findProduct(productId);
  return product;
};

module.exports = {
  getAllProducts,
  getProduct,
};
