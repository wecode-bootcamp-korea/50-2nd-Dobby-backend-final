const productDao = require("../models/productDao");

const getProductsList = async (category, sortBy, search) => {
  const ordering = async (sortBy) => {
    const sortOptions = {
      priceAsc: "ORDER BY p.price ASC , p.id ASC",
      priceDesc: "ORDER BY p.price DESC , p.id ASC",
      nameAsc: "ORDER BY p.name ASC , p.id ASC",
      newest: "ORDER BY p.created_at DESC , p.id ASC",
      default: "ORDER BY p.id",
    };
    return sortOptions[sortBy] || sortOptions.default;
  };

  const orderingQuery = await ordering(sortBy);

  const searchQuery = search
    ? `AND (p.name like '%${search}%' OR p.content like '%${search}%')`
    : "";

  const categoryQuery = category ? `AND p.category_id = ${category}` : "";

  const result = await productDao.getProducts(
    categoryQuery,
    searchQuery,
    orderingQuery
  );

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

const updateProductSales = async (userId) => {
    return await productDao.updateSales(userId);
}

module.exports = {
  getProductsList,
  getAllProducts,
  getProduct,
  updateProductSales
};
