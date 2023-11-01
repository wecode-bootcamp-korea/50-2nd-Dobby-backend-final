const express = require("express");
const router = express.Router();

const cartRouter = require("./cartRouter");
router.use("/cart", cartRouter.router);

const productRouter = require("./productRouter");
router.use("/products", productRouter.router);

module.exports = router;
