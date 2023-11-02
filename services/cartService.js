const cartDao = require("../models/cartDao");
const utils = require("../utils/error");

const updateCartStatusToPending = async (cartIds) => {
  const status = "PENDING"
  for (let i = 0; i < cartIds.length; i++) {
    await cartDao.updateCartStatus(cartIds[i], status); // DB UPDATE
  }
  if (status) {
    return status;
  }
}

const payTargetProductInfoField = async (userId) => {  //cartId는 id의 값만 여러 개 담긴 Array로 들어온다. [1, 2, 3, 5, ..] => userId를 받아서 일단 해당 유저의 주문 목록 cart.id를 호출하여 받아온다.(result => const cartId = result)
  const payCartIdList = await cartDao.findCart(userId);         // findCart(cartId[i]) => [{cartId: ~}]
  const result = [];
  if (payCartIdList.length) {
    for (let i = 0; i < payCartIdList.length; i++) {
        // result[i] = Object.values(payCartIdList[i]); // 주문 목록으로 보여질 cart.id의 값만 뽑아오기
        result[i] = payCartIdList[i]["id"] // 주문 목록으로 보여질 cart.id의 값만 뽑아오기
    }
  }
  else {
      utils.throwError(404, "USER PAYLIST DOES NOT EXIST") // Error Handling Request한 client의 Token.id가 체크박스한 주문 목록이 없으면 error return
  }
  const cartId = result;  // 주문 목록을 cartDao에서 DB와 통신해서 읽어올 수 있게 cartId 주소를 만들어서 할당

  const cartResult = [];
  for (let i = 0; i < cartId.length; i++) {               // cartId[i] = 쇼핑카트 내역 0, 1, 2, 3, ..을 의미한다.
      let cartResultArray = await cartDao.findCartAndProduct(cartId[i]);     // cart.id, cart.products_id, cart.quantity, products.name, products.price, products.image, total_price   *이 라인은 O(1), for로 보면 O(n)이다.
    cartResult[i] = cartResultArray[0]
  }
  return cartResult;
}

const calculateTotalPrice = async (cartResult) => {
  let calculateResult = 0;
  for (let i = 0; i<cartResult.length; i++) {
      calculateResult += cartResult[i]["total_price"]; // 주문 목록의 cart Data 하나 당 quantity * products_price 의 합계
  }
  return calculateResult;
}

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

const updateCartItemQuantity = async (
  productId,
  quantityDifference,
  userId
) => {
  if (quantityDifference !== "+" && quantityDifference !== "-") {
    throw new Error("Invalid quantityDifference");
  }
  const currentQuantity = await cartDao.getCartQuantity(productId, userId);

  if (quantityDifference === "-" && currentQuantity === 1) {
    throw new Error("Quantity cannot be decreased further.");
  }
  const updateCartItem = await cartDao.updateCart(
    productId,
    quantityDifference,
    userId
  );

  return updateCartItem;
};

const deleteCartItem = async (cartId, userId) => {
  const validateUserId = await cartDao.validateUserId(cartId);

  if (validateUserId === userId) {
    const deleteCartItem = await cartDao.deleteCart(cartId);

    return deleteCartItem;
  } else {
    throw new Error("User validation failed");
  }
};

module.exports = {
  addCartItem,
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
  payTargetProductInfoField,
  calculateTotalPrice,
  updateCartStatusToPending
};