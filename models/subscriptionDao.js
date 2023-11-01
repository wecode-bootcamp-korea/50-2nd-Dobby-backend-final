// request query에 들어온 dobbyBox의 value 값에 따른 HTTP response를 위한 함수
// request.body에 subscriptionInfo를 담아 보낸다.

const { appDataSource } = require("../entity/utils")

const subscriptionInfo = async (dobbyBox) => {
    try {
        return await appDataSource.query(
            `
        SELECT id, 
        sub_price, 
        sub_name 
        FROM 
        subscription 
        WHERE sub_name = '${dobbyBox}'
        `
        )
    } catch(e) {
        console.error(e);
    }
}

const findSubscriptionPrice = async (dobbyBox) => {
    try {
        return await appDataSource.query(
            `
        SELECT 
        sub_name 
        FROM 
        subscription 
        WHERE sub_name = '${dobbyBox}'
            `
        )
    } catch (e) {
        console.error(e);
    }
}


module.exports = { subscriptionInfo, findSubscriptionPrice }