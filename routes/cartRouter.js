const express = require("express")
const cartPaymentController = require("../controllers/cartPaymentController")
const { tokenValidation } = require("../middlewares/tokenValidate")
const router = express.Router();
const app = express()


router.use(tokenValidation);
app.use(tokenValidation);


router.patch("/", tokenValidation, cartPaymentController.updateCartStatus);
router.get("/payment", tokenValidation, cartPaymentController.cartPayment);



module.exports = { router }