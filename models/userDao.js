// HTTP GET, PATCH 요청에 응답한 HTTP RESPONSE를 위한 함수
// REQUEST.BODY에 내용을 담는다.(GET)
// Persistence layer
const { appDataSource } = require("../entity/utils")


// GET
const findCredit = async (userId) => {                          // 요청한 브라우저의 유저의 Credit(포인트)를 반환한다.
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



module.exports = { findCredit }

