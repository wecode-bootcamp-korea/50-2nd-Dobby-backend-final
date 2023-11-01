const productDao = require("../models/productDao");

const getAllProducts = async (req, res) => {
  const result = await productDao.getAllProducts();

  return result;
};

module.exports = {
  getAllProducts,
};
