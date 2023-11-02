const express = require('express');
const router = express.Router();
const subscriptionPaymentController = require("../controllers/subscriptionPaymentController");


router.get("/", subscriptionPaymentController.subscriptionInfo);
router.post("/", subscriptionPaymentController.subscriptionPaymentDone);
router.get("/address", subscriptionPaymentController.getAddress);
router.post("/address/done", subscriptionPaymentController.addAddress);


module.exports.router = router;