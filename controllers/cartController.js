const cartService = require("../services/cartService");
const auth = require("../utils/auth");
const secretKey = process.env.SECRET_KEY;

const addCartItem = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = auth.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    if (!productId || !quantity) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }
    const result = await cartService.addCartItem(productId, quantity, userId);
    return res.status(200).json({ message: "add success", data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = auth.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const result = await cartService.getCartItems(userId);
    return res.status(200).json({ message: "read success", data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateCartItemQuantity = async (req, res, operation) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = auth.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const productId = req.params.productId;
    const quantityDifference = req.body.quantityDifference;

    if (!productId || !quantityDifference) {
      const error = new Error("KEY ERROR");
      error.statusCode = 400;
      throw error;
    }

    const result = await cartService.updateCartItemQuantity(
      productId,
      quantityDifference,
      userId
    );
    return res
      .status(200)
      .json({ message: `${operation} successful`, data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const increaseCartItemQuantity = async (req, res) => {
  return updateCartItemQuantity(req, res, "Increase");
};

const decreaseCartItemQuantity = async (req, res) => {
  return updateCartItemQuantity(req, res, "Decrease");
};

const deleteCartItem = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = auth.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const cartId = req.params.cartId;

    if (!cartId) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const result = await cartService.deleteCartItem(cartId, userId);
    return res.status(200).json({ message: "delete success", data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error });
  }
};

module.exports = {
  addCartItem,
  getCartItems,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  deleteCartItem,
};
