const productService = require("../services/productService");

const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
};
