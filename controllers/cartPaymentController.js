const auth = require("../utils/auth")
const error = require("../utils/error")
const secretKey = process.env.SECRET_KEY
const cartService = require("../services/cartService");
const addressService = require("../services/addressService")
const userService = require("../services/userService");
const productService = require("../services/productService");
const updateCartStatus = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const accessToken = auth.decoded(token, secretKey)
        const userId = accessToken["userId"];
        const cartIds = req.body.id;

        const cartStatus = await cartService.updateCartStatusToPending(cartIds);
        return res.status(200).json({message: "OKOKOK"})
    } catch(error) {
        console.error(error);
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
}

const cartPayment = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const accessToken = auth.decoded(token, secretKey)
        const userId = accessToken["userId"];
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


const revertCartPayment = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const accessToken = auth.decoded(token, secretKey)
        const userId = accessToken["userId"];
        const revertPayment = await cartService.updateStatusRevert(userId);
        return res.status(200).json({message: "PAYMENT CANCELED SUCCESS"});
    } catch(e) {
        console.error(e);
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - PATCH: /cart/payment/reversion"})
    }
}

const addAddress = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const accessToken = auth.decoded(token, secretKey)
        const userId = accessToken["userId"];

        const { content, phonenumber, name } = req.body;
        if (!content || !phonenumber || !name) {
            error.throwError(404, "NO ADDRESS RECEIVED");
        }
        const addressAddition = await addressService.addAddress(userId, content, phonenumber, name);
        return res.status(200).json({message: "POST - ADDRESS ADDED SUCCESS"});
    } catch (e) {
        console.error(e);
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - PATCH: /cart/payment/address/done"})
    }
}

const getAddress = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const accessToken = auth.decoded(token, secretKey)
        const userId = accessToken["userId"];

        const result = [];
        const resultObj = {};
        const addressDataField = await addressService.addressField(userId);
        resultObj["address"] = addressDataField;
        result[0] = resultObj;
        return res.status(200).json({message: "ADDRESS SEND SUCCESS", data: result})
    } catch (e) {
        console.error(e);
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET: /cart/payment/address"})

    }
}

const updateStatusSalesCredit = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const accessToken = auth.decoded(token, secretKey)
        const userId = accessToken["userId"];
        const { paymentPrice }= req.body;

        if (!paymentPrice) { // paymentPrice = ""로 오면 DB에서 not null로 인식하기 때문에 0원이라는 integer 값이 와야 한다.
            error.throwError(400, "NO PRICE RECEIVED")
        }

        // Status
        const finishStatus = await cartService.updateStatusFinishDone(userId);
        // Sales
        const finishSales = await productService.updateProductSales(userId);
        // Credit
        const finishCredit = await userService.updateCredit(userId, paymentPrice);

        return res.status(200).json({message: "PAYMENT SUCCESS"})
    } catch(e) {
        console.error(e);
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - PATCH: /cart/payment/done"})
    }
}


module.exports = {
    cartPayment,
    updateCartStatus,
    revertCartPayment,
    addAddress,
    getAddress,
    updateStatusSalesCredit
}