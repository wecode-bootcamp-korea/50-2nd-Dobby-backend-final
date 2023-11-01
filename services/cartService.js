const cartDao = require("../models/cartDao");
const utils = require("../utils/index");

const addCartItem = async (productId, quantity, userId) => {

  const isProductInCart = await cartDao.existsInCart(userId, productId);

  try {
    if (isProductInCart) {
      await cartDao.plusQuantity(userId, productId, quantity);
    } else {
      await cartDao.createCart(productId, quantity, userId);
    }
  } catch (error) {
    console.error(error);
    utils.throwError(500, "Data insert Error");
  }
};

const getCartItems = async (userId) => {
  const getCartItems = await cartDao.selectCart(userId);

  return getCartItems;
};

const updateCartItemQuantity = async (productId, quantityDifference, userId) => {
  if (quantityDifference !== "+" && quantityDifference !== "-") {
    throw new Error("Invalid quantityDifference");
  }
  const currentQuantity = await cartDao.getCartQuantity(productId, userId);

  if (quantityDifference === '-' && currentQuantity === 1) {
    throw new Error ("Quantity cannot be decreased further.")
  }
  const updateCartItem = await cartDao.updateCart(
    productId,
    quantityDifference,
    userId
  );

  return updateCartItem;
};

const deleteCartItem = async (cartId, userId) => {
  const deleteCartItem = await cartDao.deleteCart(cartId, userId);

  return deleteCartItem;
};

module.exports = {
addCartItem,
getCartItems,
updateCartItemQuantity,
deleteCartItem
};
