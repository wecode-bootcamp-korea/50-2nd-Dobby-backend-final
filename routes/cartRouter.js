const express = require("express")
const cartPaymentController = require("../controllers/cartPaymentController")
// const { tokenValidation } = require("../middlewares/tokenValidate")
const router = express.Router();

// router.use(tokenValidation);
// app.use(tokenValidation);

router.get("/payment", cartPaymentController.cartPayment);
router.patch("/payment/reversion", cartPaymentController.revertCartPayment);
router.patch("/payment/done", cartPaymentController.cartPaymentDone);
router.post("/payment/address/done", cartPaymentController.paymentAddressFieldGeneration);
// router.get("/payment/ping", cartPaymentController.pingPong);

// router.get("/payment", tokenValidation, cartPaymentController.cartPayment);
// router.patch("/payment/reversion", tokenValidation, cartPaymentController.revertCartPayment);
// router.patch("/payment/done", tokenValidation, cartPaymentController.cartPaymentDone);
// router.post("/payment/address/done", tokenValidation, cartPaymentController.paymentAddressFieldGeneration);


module.exports = { router }