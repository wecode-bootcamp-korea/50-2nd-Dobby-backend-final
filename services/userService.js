// Dao에서 당겨와서  Controller로 보내주는 함수
// 명확한 return 값을 보내야 한다.
// Business layer
const { findUser, findCredit, deductCredit} = require("../models/userDao");
const {throwErr} = require("../entity/utils");

// token 내의 id를 받으면 Dao가 DB에 접근해서
const existingUser = async (userId) => {
    try {
        const userVerification = await findUser(userId); // Error Handling에 의한 error가 반환되면 catch로 빠진다.
    } catch (e) {
        console.error(e);
    }
}

// Dao가 DB에 접근해서 Credit 숫자를 알려주면 0 index의 값을 읽어서 반환한다.
const creditField = async (userId) => {
    try {
        const userCredit = await findCredit(userId);    // findCredit(userId) => [{user.credit: ~}]
        if (userCredit) {                        // existingCredit이 Null인 지
            return await userCredit[0]["credit"];      // userCredit[0].credit => HTTP GET 요청한 유저가 보유한 uses.credit 금액 숫자
        } else {
            throwErr(401, "CREDIT DOES NOT EXIST");
        }
    } catch(e) {
        console.error(e)
    }
}

const creditDeductionField = async (userId, paymentPrice) => {
    try {
            return await deductCredit(userId, paymentPrice);
    } catch (e) {
        console.error(e);
    }
}


module.exports = { existingUser,  creditField, creditDeductionField }