const express = require('express');
const router = express.Router(); 

const productRouter = require("./productRouter")

router.use('/products', productRouter.productRouter)

module.exports = router;
 
const cartRouter = require("./cartRouter");
router.use("/cart", cartRouter.router);

