// HTTP PATCH REQUEST에 응답하기 위한 함수
// RESPONSE CODE 204로 응답한다.

const { throwErr } = require("../entity/utils")
const { addProductSales } = require("../models/productDao");

const productsSalesAddition = async (userId) => {
    try {
        return await addProductSales(userId);
    } catch (e) {
        console.error(e);
    }
}

module.exports = { productsSalesAddition }