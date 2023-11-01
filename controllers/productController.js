const productService = require('../services/productService');

const getProductList = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { getProductList };
