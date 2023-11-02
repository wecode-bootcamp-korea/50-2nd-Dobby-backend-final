// cart/payment 이하의 계층에서 작동하는 함수
// Persistence Layer
const { calculateTotalPrice, payTargetProductInfoField, makeCartStatusPending } = require("../services/cartService");
const { creditField } = require("../services/userService");
const { addressField } = require("../services/addressService");


const updateCartStatus = async (req, res) => {
    try {
        const userId = req.foundUser;
        const cartId = req.body.id;

        const cartStatusToPending = await makeCartStatusPending(userId, cartId); // query로 받아온 cartId 배열을 makeCartStatusPending에서 병렬적으로 Dao를 호출하여 PENDING으로 바꿔준다. // erro 반환 시 catch로 빠짐
        return res.status(200).json({message: "OKOKOK"})

    } catch(e) {
        console.error(e);                                       // 토큰 검증 secret key 에러 => JsonWebTokenError: invalid signature // 토큰 만료 에러 => TokenExpiredError: jwt expired
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - PATCH: /cart"})
    }
}

// 결제 페이지 HTTP GET RESPONSE
const cartPayment = async (req, res) => {
    try {
        const userId = req.foundUser;
        console.log(userId)
        // const cartId = [1, 2, 3];

        // 수정된 사항 => // cart에 브라우저가 GET 요청한 cart 상품이 있는 지 => 수정 => request에 담아 받지 않고, DB PROTOCOL로 주문 목록을 읽어온다.

        // data collect
        const result = [];
        const resultObj = {}
        // const cartStatusToPending = await makeCartStatusPending(cartId); // query로 받아온 cartId 배열을 makeCartStatusPending에서 병렬적으로 Dao를 호출하여 PENDING으로 바꿔준다. // erro 반환 시 catch로 빠짐

        const cartPayTargetInfoList = await payTargetProductInfoField(userId);  // [전처리 복수] => pay 대상인 product info를 전부 담은 array를 반환해 준다. // payTargetPrductInfoField cartService에서 userId와 user.id가 같은 지 검증, error handling도 진행된다.
        const userAddressList = await addressField(userId);                     // [전처리 복수] => address Info 여러 개를 array로 가진다. 복수형 빈 array도 그대로 json에 담아 보낸다. 브라우저에 설정해 주면 된다.
        const userCreditInt = await creditField(userId);                              // [전처리 단수] => Credit Int 한 개만 value로 가진다. 빈 array일 경우에는 error Handling 통해서 HTTP code 401에 메시지를 보내도록 해 놓았다.
        const totalPrice = await calculateTotalPrice(cartPayTargetInfoList);
        resultObj["paymentInfo"] = cartPayTargetInfoList;
        resultObj["address"] = userAddressList;
        resultObj["credit"] = userCreditInt;
        resultObj["totalPrice"] = totalPrice;
        result[0] = resultObj;
        // Error Handling 끝
        console.log("okokok")
        return res.status(200).json({message: "RECEIVING REQUEST SUCCESS", data: result});

    } catch(e) {
        console.error(e);                                       // 토큰 검증 secret key 에러 => JsonWebTokenError: invalid signature // 토큰 만료 에러 => TokenExpiredError: jwt expired
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET: /cart/payment"})
    }
}

module.exports = { cartPayment, updateCartStatus}

