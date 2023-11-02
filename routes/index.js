const express = require('express');
const router = express.Router(); 

const userRouter = require("./userRouter");
const subscriptionRouter = require("./subscriptionRouter");
const productRouter = require("./productRouter");

const cartRouter = require("./cartRouter");

router.use("/users", userRouter.router);
router.use("/subscription", subscriptionRouter.router);
router.use("/products", productRouter.router);

router.use("/cart", cartRouter.router);

module.exports = router;