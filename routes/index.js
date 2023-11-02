const express = require("express");
const router = express.Router();
const cartRouter = require("./cartRouter");
const productRouter = require("./productRouter");

router.use("/cart", cartRouter.router);
router.use("/products", productRouter.router);

module.exports = router;
