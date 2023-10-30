// Dao에서 당겨와서  Controller로 보내주는 함수
// 명확한 return 값을 보내야 한다.
// Business layer

const { findCart, findCartAndProduct, revertCartStatus, makeCartStatusDone} = require("../models/cartDao");
const { throwErr } = require("../entity/utils")

const payTargetProductInfoField = async (userId) => {  //cartId는 id의 값만 여러 개 담긴 Array로 들어온다. [1, 2, 3, 5, ..] => userId를 받아서 일단 해당 유저의 주문 목록 cart.id를 호출하여 받아온다.(result => const cartId = result)
    try {
        const payCartIdList = await findCart(userId);         // findCart(cartId[i]) => [{cartId: ~}]
        const result = [];
        if (payCartIdList.length) {
            for (let i = 0; i < payCartIdList.length; i++) {
                // result[i] = Object.values(payCartIdList[i]); // 주문 목록으로 보여질 cart.id의 값만 뽑아오기
                result[i] = payCartIdList[i]["id"] // 주문 목록으로 보여질 cart.id의 값만 뽑아오기
            }
            // return result;
        }
        else {
            throwErr(404, "USER PAYLIST DOES NOT EXIST") // Error Handling Request한 client의 Token.id가 체크박스한 주문 목록이 없으면 error return
        }
        console.log(result)
        const cartId = result;  // 주문 목록을 cartDao에서 DB와 통신해서 읽어올 수 있게 cartId 주소를 만들어서 할당
        const cartResult = [];
        for (let i = 0; i < cartId.length; i++) {               // cartId[i] = 쇼핑카트 내역 0, 1, 2, 3, ..을 의미한다.
            console.log(cartId[i]);
            let cartResultArray = await findCartAndProduct(cartId[i]);     // cart.id, cart.products_id, cart.quantity, products.name, products.price, products.image, total_price   *이 라인은 O(1), for로 보면 O(n)이다.
            cartResult[i] = cartResultArray[0]
        }
        console.log("cartData returns: ", cartResult);          // for 문은 내의 await은 for의 병렬처리로 인해 promise를 병렬적으로 기다리게 해 준다.    // cartDao.findCartAndProduct가 error를 반환하면 catch로 빠진다.
        return cartResult;                                      // [{},{},{},..]
    } catch(e) {
        console.error(e)
    }
}

const calculateTotalPrice = async (cartResult) => {
    try {
        let calculateResult = 0;
        for (let i = 0; i<cartResult.length; i++) {
            calculateResult += cartResult[i]["total_price"]; // 주문 목록의 cart Data 하나 당 quantity * products_price 의 합계
        }
        return calculateResult;
    } catch (e) {
        console.error(e);
    }
}

const cartPaymentCancellationField = async (userId) => {
    try {
        return await revertCartStatus(userId);
    } catch(e) {
        console.error(e);
    }
}

const cartStatusDoneField = async(userId) => {
    try {
            return await makeCartStatusDone(userId);
    } catch (e) {
        console.error(e);
    }
}

module.exports = { payTargetProductInfoField, calculateTotalPrice, cartPaymentCancellationField, cartStatusDoneField }