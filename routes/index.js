const express = require("express")
const router = express.Router();

const cartRouter = require("./cartRouter")

router.use("/cart", cartRouter.router)

module.exports =  router // 모듈로 빼야 한다.
