const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const cartPaymentController = require("../controllers/cartPaymentController");

router.post("/:productId" , cartController.addCartItem);

router.get("/" , cartController.getCartItems);

router.patch("/", cartPaymentController.updateCartStatus);

router.put("/increase/:productId" , cartController.increaseCartItemQuantity);

router.put("/decrease/:productId" , cartController.decreaseCartItemQuantity);

router.delete("/:cartId" , cartController.deleteCartItem);

router.get("/payment", cartPaymentController.cartPayment);

router.patch("/payment", cartPaymentController.updateStatusSalesCredit);

router.patch("/payment/reversion", cartPaymentController.revertCartPayment)

router.post("/payment/address/done", cartPaymentController.addAddress);

router.get("/payment/address", cartPaymentController.getAddress);



module.exports.router = router;