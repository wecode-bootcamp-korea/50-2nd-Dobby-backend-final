const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const subscriptionRouter = require("./subscriptionRouter");
const productRouter = require("./productRouter");

router.use("/users", userRouter.router);
router.use("/subscription", subscriptionRouter.router);
router.use("/product", productRouter.router);

module.exports = router;
