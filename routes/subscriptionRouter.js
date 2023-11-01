const express = require("express")
const subscriptionPaymentController = require("../controllers/subscriptionPaymentController")
const {tokenValidation} = require("../middlewares/tokenValidate");
const app = express()
const router = express.Router();

router.use(tokenValidation);
app.use(tokenValidation);


// router.get("/payment", subscriptionPaymentController.subscriptionPayment);
// router.post("/payment/done", subscriptionPaymentController.subscriptionPaymentDone);
// router.post("/payment/address/done", subscriptionPaymentController.paymentAddressFieldGeneration);
router.get("/payment", tokenValidation, subscriptionPaymentController.subscriptionPayment);
router.post("/payment", tokenValidation, subscriptionPaymentController.subscriptionPaymentDone);
router.post("/payment/address/done", tokenValidation, subscriptionPaymentController.paymentAddressFieldGeneration);
router.get("/payment/address", tokenValidation, subscriptionPaymentController.sendAddress);
router.get("/payment/done", tokenValidation, subscriptionPaymentController.paymentDonePage);


module.exports = { router }