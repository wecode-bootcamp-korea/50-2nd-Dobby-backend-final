const express = require("express");
const router = express.Router();

const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const subscriptionRouter = require("./subscriptionRouter");
const subscriptionPaymentRouter = require("./subscriptionPaymentRouter")

router.use("/cart", cartRouter.router);
router.use("/products", productRouter.router);
router.use("/users", userRouter.router);
router.use("/subscription", subscriptionRouter.router);
router.use("/payment", subscriptionPaymentRouter.router)


module.exports = router;
