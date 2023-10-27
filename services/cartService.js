const cartDao = require("../model/cartDao");

const addCartService = async (productId, quantity, userId) => {
  const statusId = 1;

  const insertShoppingCart = await cartDao.createCart(
    productId,
    quantity,
    userId,
    statusId
  );

  return insertShoppingCart;
};

const selectCartService = async (userId) => {
  const selectShoppingCart = await cartDao.selectCart(userId);

  return selectShoppingCart;
};

const checkBoxService = async (userId, cartId, statusId) => {
  const checkBox = cartDao.checkBox(userId, cartId, statusId);

  return checkBox;
};

const updateCartService = async (productId, quantityDifference, userId) => {
  if (quantityDifference !== "+" && quantityDifference !== "-") {
    throw new Error("Invalid quantityDifference");
  }

  const increaseShoppingCart = await cartDao.updateCart(
    productId,
    quantityDifference,
    userId
  );

  return increaseShoppingCart;
};

const deleteCartService = async (productId, userId) => {
  const deleteShoppingCart = await cartDao.deleteCart(productId, userId);

  return deleteShoppingCart;
};

module.exports = {
  addCartService,
  selectCartService,
  checkBoxService,
  updateCartService,
  deleteCartService,
};
