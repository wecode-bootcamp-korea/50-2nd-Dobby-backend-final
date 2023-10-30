// HTTP GET, PATCH 요청에 응답한 HTTP RESPONSE를 위한 함수
// REQUEST.BODY에 내용을 담는다.(GET)
// Persistence layer
const { appDataSource } = require("../entity/utils")

// GET
const findUser = async (userId) => {
        try{
                return await appDataSource.query(
                    `
                    SELECT 
                    id 
                    FROM 
                    users 
                    WHERE 
                    '${userId}' = users.id
                    `
                )
        } catch(e) {
                console.error(e);
        }
}

// GET
const findCredit = async (userId) => {                          // 요청한 브라우저의 유저가 Credit(포인트)를 반환한다.
        try {
                return await appDataSource.query(
                    `
                    SELECT credit 
                    FROM 
                    users 
                    WHERE 
                    id = '${userId}'
                    `
                )
                } catch (e) {
                        console.error(e);
                }
        }


// PATCH
const deductCredit = async (userId, paymentPrice) => { // 기존 credit에서 결제 금액만큼 빼기
        try {
                return await appDataSource.query(
                    `
                    UPDATE users 
                    SET 
                    credit = credit - ${parseInt(paymentPrice)}
                    WHERE 
                    id = '${userId}'
                    `
                )
        } catch (e) {
                console.error(e);
        }
}

module.exports = { findUser, findCredit, deductCredit }

