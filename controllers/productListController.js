const productListService = require('../services/productListService');

const productList = async (req, res) => {
  try {
    const result = await productListService.getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { productList };
