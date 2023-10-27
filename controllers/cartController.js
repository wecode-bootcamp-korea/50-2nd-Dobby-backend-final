const cartService = require("../services/cartService");
const etc = require("../utils/etc");
const throwError = require("../utils/index");
const secretKey = process.env.SECRET_KEY;

const addCartController = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    if (!productId || !quantity) {
      return res.status(400).json({ message: "KEY ERROR" });
    }
    const result = await cartService.addCartService(
      productId,
      quantity,
      userId
    );
    return res.status(200).json({ message: "add success", data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const selectCartController = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const result = await cartService.selectCartService(userId);
    return res.status(200).json({ message: "read success", data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const checkBoxController = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const { cartId, statusId } = req.query;

    if (!cartId || !statusId) {
      return res.status(404).json({ message: "KEY ERROR" });
    }

    const result = await cartService.checkBoxService(userId, cartId, statusId);

    return res.status(200).json({ message: "check success", data: result });
  } catch (error) {
    console.error(error);
    throwError(400, "check error");
  }
};

const increaseCartController = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const productId = req.params.productId;

    if (!productId) {
      return res.status(404).json({ message: "KEY ERROR" });
    }

    const result = await cartService.updateCartService(productId, "+" , userId);
    return res.status(200).json({ message: "increase success", data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const decreaseCartController = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;

    const productId = req.params.productId;

    if (!productId) {
      return res.status(404).json({ message: "KEY ERROR" });
    }

    const result = await cartService.updateCartService(productId, "-" , userId);
    return res.status(200).json({ message: "decrease success", data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteCartController = async (req, res) => {
  try {
    const acccesToken = req.headers.authorization;
    const decoded = etc.decoded(acccesToken, secretKey);
    const userId = decoded.userId;
    
    const productId = req.params.productId;

    if (!productId) {
      return res.status(404).json({ message: "KEY ERROR" });
    }

    const result = await cartService.deleteCartService(productId , userId);
    return result.status(200).json({ message: "delete success", data: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error });
  }
};

module.exports = {
  addCartController,
  selectCartController,
  checkBoxController,
  increaseCartController,
  decreaseCartController,
  deleteCartController,
};
