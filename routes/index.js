const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const subscriptionRouter = require("./subscriptionRouter");
const productListRouter = require("./productListRouter");

router.use("/users", userRouter.router);
router.use("/subscription", subscriptionRouter.router);
router.use("/productList", productListRouter.router);

module.exports = router;
