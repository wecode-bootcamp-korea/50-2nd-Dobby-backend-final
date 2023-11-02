const auth = require("../utils/auth")
const secretKey = process.env.SECRET_KEY
const cartService = require("../services/cartService");
const addressService = require("../services/addressService")
const userService = require("../services/userService");

const updateCartStatus = async (req, res) => {
    try {

        const userId = auth.decoded(req.headers.authorization, secretKey)
        const cartIds = req.body.id;

        await cartService.updateCartStatusToPending(userId, cartIds);
        return res.status(200).json({message: "OKOKOK"})
    } catch(error) {
        console.error(error);
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const cartPayment = async (req, res) => {
    try {
        const userId = req.foundUser;
        const result = [];
        const resultObj = {}
        const cartPayTargetInfoList = await cartService.payTargetProductInfoField(userId);
        const totalPrice = await cartService.calculateTotalPrice(cartPayTargetInfoList);
        resultObj["paymentInfo"] = cartPayTargetInfoList;
        resultObj["address"] =  await addressService.addressField(userId);
        resultObj["credit"] = await userService.creditField(userId);
        resultObj["totalPrice"] = totalPrice;
        result[0] = resultObj;
        return res.status(200).json({message: "RECEIVING REQUEST SUCCESS", data: result});
    } catch(e) {
        console.error(e);
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET: /cart/payment"})
    }
}

module.exports = {
    cartPayment,
    updateCartStatus
}

