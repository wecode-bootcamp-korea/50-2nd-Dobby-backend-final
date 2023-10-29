const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/" , cartController.addCartController);

router.get("/" , cartController.selectCartController);

router.put("/increase/:productId" , cartController.increaseCartController);

router.put("/decrease/:productId" , cartController.decreaseCartController);

router.put("/updateStatus" , cartController.checkBoxController);

router.put("/updateAllStatus" , cartController.allCheckBoxController);

router.delete("/:productId" , cartController.deleteCartController);

module.exports = {router};