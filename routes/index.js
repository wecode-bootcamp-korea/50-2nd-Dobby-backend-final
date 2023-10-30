const express = require("express")
const router = express.Router();

const cartRouter = require("./cartRouter")
const subscriptionRouter = require("./subscriptionRouter")

router.use("/cart", cartRouter.router)
router.use("/", subscriptionRouter.router);

module.exports =  router // 모듈로 빼야 한다.
