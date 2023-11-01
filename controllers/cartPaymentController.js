// cart/payment 이하의 계층에서 작동하는 함수
// Persistence Layer
const { throwErr } = require("../entity/utils");
const { calculateTotalPrice, payTargetProductInfoField, cartPaymentCancellationField, cartStatusDoneField, makeCartStatusPending } = require("../services/cartService");
const { creditField, creditDeductionField } = require("../services/userService");
const { addressField, addressGenerationField } = require("../services/addressService");
const { productsSalesAddition } = require("../services/productService");


const cartBuyBtn = async (req, res) => {
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

// 주문 페이지 HTTP GET RESPONSE
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
        console.log()
        // Error Handling 끝
        console.log("okokok")
        return res.status(200).json({message: "RECEIVING REQUEST SUCCESS", data: result});

    } catch(e) {
        console.error(e);                                       // 토큰 검증 secret key 에러 => JsonWebTokenError: invalid signature // 토큰 만료 에러 => TokenExpiredError: jwt expired
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET: /cart/payment"})
    }
}

// 주문 취소 버튼 controller => /cart/payment/reversion
const revertCartPayment = async (req, res) => {
    try {
        const userId = req.foundUser;
        const cartPaymentCancellation = await cartPaymentCancellationField(userId); // error 반환하면 catch로 빠짐
        return res.status(204);
    } catch(e) {
        console.error(e);
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - PATCH: /cart/payment/reversion"})
    }
}

const cartPaymentDone = async (req, res) => {
    try {
        const userId = req.foundUser;
        // const userId = req.body.id; // 임시로 req.body에서 받아서 사용
        const { address_id, payment_price }= req.body["data"];

         // request body에 담긴 실제 결제된(50000원 미만일 때의 배송비 포함) 금액, integer로 받는다.
        if (!payment_price) { // paymentPrice = ""로 오면 DB에서 not null로 인식하기 때문에 0원이라는 integer 값이라도 와야 한다.
            throwErr(400, "NOT PAID OR BAD REQUEST")
        }

        // products.sales + 1 (cart.status = PENDING인 cart.id와 product를 INNER JOIN, UPDATE products.sales => "" + 1)
        const productsSalesAdditionField = await productsSalesAddition(userId); // error가 반환되면 catch로 빠진다.
        // cart.status => DONE (cart.status = PENDING => DONE)
        const cartPaymentDoneField = await cartStatusDoneField(userId);         // error가 반환되면 catch로 빠진다.

        const creditDeducted = await creditDeductionField(userId, payment_price); // credit Deduction error 반환 시 catch로 빠진다.

        // 재고 관리 (재고가 음수가 되는 결과가 되면 결제 실패, error handling 따로 구현) // UUID를 통해서 난수 생성하여 uuid apikey 구현 가능(추후)

        return res.redirect("/cart/payment/done")
    } catch(e) {
        console.error(e);
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - PATCH: /cart/payment/done"})
    }
}

const paymentAddressAddition = async (req, res) => {
    try {
        const userId = req.foundUser;
        // const userId = req.body.id; // 임시로 req.body에서 받아서 사용

        // payment/address/done으로 request.body에 content, phonenumber, name이 담긴 POST REQUEST가 오지 않으면
        const { content, phonenumber, name } = req.body;
        console.log(content, phonenumber, name)
        if (!content || !phonenumber || !name) {
            throwErr(404, "DOBBYBOX SUBSCRIPTION NOT FOUND");
        }
        const genAddressField = await addressGenerationField(userId, content, phonenumber, name); // error가 반환되면 catch로 빠진다.

        return res.status(201).json({message: "POST - ADDRESS ADDED SUCCESS"});
    } catch (e) {
        console.error(e);
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - POST: /cart/payment/address/done"})
    }
}

const sendAddress = async (req, res) => {
    try {
        const userId = req.foundUser;
        // const userId = req.body.id; // 임시로 req.body에서 받아서 사용

        const result = [];
        const resultObj = {};
        const addressDataField = await addressField(userId); // 배열 안에 1개 이상의 주소가 있다. 기존에 db에 저장된 주소 데이터가 없다면 빈 배열을 반환한다.
        resultObj["address"] = addressDataField;
        result[0] = resultObj;

        return res.status(200).json({message: "AJAX ADDRESS SEND SUCCESS", data: result})
    } catch (e) {
        console.error(e);
        return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET: /cart/payment/address/"})
    }
}

const paymentDonePage = async (req, res) => {
        try {
            const userId = req.foundUser;
            // const userId = req.body.id; // 임시로 req.body에서 받아서 사용
            res.status(200).json({message: "SUCCESS"});
        } catch (e) {
            console.error(e);
            return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET: /cart/payment/done"})
        }
}

module.exports = { cartPayment, revertCartPayment, cartPaymentDone, paymentAddressAddition, sendAddress, paymentDonePage, cartBuyBtn}

