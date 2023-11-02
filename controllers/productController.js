const productService = require("../services/productService");
const reviewService = require("../services/reviewService");

const getProducts = async (req, res) => {
  try {
    let { category, sortBy, search } = req.query;

    const result = await productService.getProductsList(
      category,
      sortBy,
      search
    );
    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductList = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const productId = req.params.productId;
    const [product] = await productService.getProduct(productId);
    if (product === undefined)
      return res.status(404).json({ message: "PRODUCT_NOT_FOUND" });
    const review = await reviewService.findReviewByProductId(productId);
    if (review[0].id === null) return res.status(200).json({ product });
    res.status(200).json({ product, review });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductDetail,
  getProductList,
};
