const express = require("express")
const subscriptionPaymentController = require("../controllers/subscriptionPaymentController")
// const { tokenValidation } = require("../middlewares/tokenValidate")

const router = express.Router();

// router.use(tokenValidation);
// app.use(tokenValidation);


// router.get("/ping", subscriptionPaymentController.pingPong);
router.get("/payment", subscriptionPaymentController.subscriptionPayment);
router.post("/payment/done", subscriptionPaymentController.subscriptionPaymentDone);
router.post("/payment/address/done", subscriptionPaymentController.paymentAddressFieldGeneration);
// router.get("/payment", tokenValidation, subscriptionPaymentController.subscriptionPayment);
// router.post("/payment/done", tokenValidation, subscriptionPaymentController.subscriptionPaymentDone);
// router.post("/payment/address/done", tokenValidation, subscriptionPaymentController.paymentAddressFieldGeneration);

module.exports = { router }