const { findCredit } = require("../models/userDao");
const {throwErr} = require("../entity/utils");

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


module.exports = { creditField }