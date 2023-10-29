const cartDao = require("../model/cartDao");
const utils = require("../utils/index");

const addCartService = async (productId, quantity, userId) => {
  const statusId = 1;

  const isProductInCart = await cartDao.existsInCart(userId, productId);
  console.log(isProductInCart);
  try {
    if (isProductInCart) {
      await cartDao.plusQuantity(userId, productId, quantity);
    } else {
      await cartDao.createCart(productId, quantity, userId, statusId);
    }
  } catch (error) {
    console.error(error);
    utils.throwError(500, "Data insert Error");
  }
};

const selectCartService = async (userId) => {
  const selectShoppingCart = await cartDao.selectCart(userId);

  return selectShoppingCart;
};

const checkBoxService = async (userId, cartId, statusId) => {
  const checkBox = cartDao.checkBox(userId, cartId, statusId);

  return checkBox;
};

const allCheckBoxService = async (userId, statusId) => {
  const allCheckBox = cartDao.updateCartStatus(userId, statusId);

  return allCheckBox;
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
  allCheckBoxService,
  updateCartService,
  deleteCartService,
};
