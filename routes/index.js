const express = require("express");
const router = express.Router();

const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const subscriptionRouter = require("./subscriptionRouter");

router.use("/cart", cartRouter.router);
router.use("/products", productRouter.router);
router.use("/users", userRouter.router);
router.use("/subscription", subscriptionRouter.router);

module.exports = router;
