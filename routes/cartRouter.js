const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/:productId" , cartController.addCartItem);

router.get("/" , cartController.getCartItems);

router.put("/increase/:productId" , cartController.increaseCartItemQuantity);

router.put("/decrease/:productId" , cartController.decreaseCartItemQuantity);

router.delete("/:cartId" , cartController.deleteCartItem);

module.exports = {router};