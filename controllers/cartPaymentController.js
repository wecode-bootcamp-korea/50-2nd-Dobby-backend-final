// cart/payment 이하의 계층에서 작동하는 함수
// Persistence Layer
const { throwErr } = require("../entity/utils");
const { calculateTotalPrice, payTargetProductInfoField, cartPaymentCancellationField, cartStatusDoneField } = require("../services/cartService");
const { creditField, creditDeductionField } = require("../services/userService");
const { addressField, addressGenerationField } = require("../services/addressService");
const { productsSalesAddition } = require("../services/productService");

// 주문 페이지 HTTP GET RESPONSE
const cartPayment = async (req, res) => {
    try {
        // const userId = req.foundUser;
        const userId = req.body.id; // 임시로 req.body에서 받아서 사용
        if (!userId) {
            throwErr(404, "USER NOT FOUND")
        }

        // 수정된 사항 => // cart에 브라우저가 GET 요청한 cart 상품이 있는 지 => 수정 => request에 담아 받지 않고, DB PROTOCOL로 주문 목록을 읽어온다.

        // data collect
        const result = [];
        const resultObj = {}
        // cartPayInfoList => cart_status_id가 1인 cartId list 불러오기 => cartId로 주문 상품 정보를 불러온다(복수)  // 전, 후 둘 다 error 반환되면 catch로 빠진다.
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

        res.json({message: "RECEIVING REQUEST SUCCESS", data: result});
    } catch(e) {
        console.error(e);                                       // 토큰 검증 secret key 에러 => JsonWebTokenError: invalid signature // 토큰 만료 에러 => TokenExpiredError: jwt expired
        res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET: /cart/payment"})
    }
}

// 주문 취소 버튼 controller => /cart/payment/reversion
const revertCartPayment = async (req, res) => {
    try {
        // const userId = req.foundUser;
        const userId = req.body.id; // 임시로 req.body에서 받아서 사용

        // cart.status = PENDING => NONE
        const cartPaymentCancellation = await cartPaymentCancellationField(userId); // error 반환하면 catch로 빠짐
        res.statusCode(204);
    } catch(e) {
        console.error(e);
        res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - PATCH: /cart/payment/reversion"})
    }
}

const cartPaymentDone = async (req, res) => {
    try {
        // const userId = req.foundUser;
        const userId = req.body.id; // 임시로 req.body에서 받아서 사용

        const { paymentPrice } = req.body; // request body에 담긴 실제 결제된(50000원 미만일 때의 배송비 포함) 금액, integer로 받는다.
        if (!paymentPrice) { // paymentPrice = ""로 오면 DB에서 not null로 인식하기 때문에 0원이라는 integer 값이라도 와야 한다.
            throwErr(400, "NOT PAID OR BAD REQUEST")
        }


        // products.sales + 1 (cart.status = PENDING인 cart.id와 product를 INNER JOIN, UPDATE products.sales => "" + 1)
        const productsSalesAdditionField = await productsSalesAddition(userId); // error가 반환되면 catch로 빠진다.
        // cart.status => DONE (cart.status = PENDING => DONE)
        const cartPaymentDoneField = await cartStatusDoneField(userId);         // error가 반환되면 catch로 빠진다.

        const creditDeducted = await creditDeductionField(userId, paymentPrice); // credit Deduction error 반환 시 catch로 빠진다.

        // 재고 관리 (재고가 음수가 되는 결과가 되면 결제 실패, error handling 따로 구현) // UUID를 통해서 난수 생성하여 uuid apikey 구현 가능(추후)

        res.json({message : "Done"})
    } catch(e) {
        console.error(e);
        res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - PATCH: /cart/payment/done"})
    }
}

const paymentAddressFieldGeneration = async (req, res) => {
    try {
        // const userId = req.foundUser;
        const userId = req.body.id; // 임시로 req.body에서 받아서 사용

        // payment/address/done으로 request.body에 content, phonenumber, name이 담긴 POST REQUEST가 오지 않으면
        const { content, phonenumber, name } = req.body;
        if (!content || !phonenumber || !name) {
            throwErr(400, "BAD REQUEST");
        }
        const genAddressField = await addressGenerationField(userId, content, phonenumber, name); // error가 반환되면 catch로 빠진다.

        res.statusCode(204);
    } catch (e) {
        console.error(e);
        res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - POST: /cart/payment/address/done"})
    }
}



module.exports = { cartPayment, revertCartPayment, cartPaymentDone, paymentAddressFieldGeneration, pingPong }

