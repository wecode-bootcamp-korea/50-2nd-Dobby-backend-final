const express = require("express")
const cartPaymentController = require("../controllers/cartPaymentController")
const { tokenValidation } = require("../middlewares/tokenValidate")
const router = express.Router();
const app = express()


router.use(tokenValidation);
app.use(tokenValidation);

// router.get("/payment", cartPaymentController.cartPayment);
// router.patch("/payment/reversion", cartPaymentController.revertCartPayment);
// router.patch("/payment/done", cartPaymentController.cartPaymentDone);
// router.post("/payment/address/done", cartPaymentController.paymentAddressAddition);
// router.get("/payment/address", cartPaymentController.sendAddress)

router.patch("/", tokenValidation, cartPaymentController.cartBuyBtn);
router.get("/payment", tokenValidation, cartPaymentController.cartPayment);
router.get("/payment/done", tokenValidation, cartPaymentController.paymentDonePage)
router.patch("/payment/reversion", tokenValidation, cartPaymentController.revertCartPayment);
router.patch("/payment/done", tokenValidation, cartPaymentController.cartPaymentDone);
router.post("/payment/address/done", tokenValidation, cartPaymentController.paymentAddressAddition); // 주소만 db에 즉각적으로 넣습ㄴ디ㅏ.
router.get("/payment/address", tokenValidation, cartPaymentController.sendAddress) // 주소만 다시 받아갑니다



module.exports = { router }