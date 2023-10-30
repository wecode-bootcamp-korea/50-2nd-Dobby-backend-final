// Dao에서 당겨와서 Controller로 보내는 함수
// 명확한 값을 반환해야 한다.
// Business Layer

const { throwErr } = require("../entity/utils");
const { addUsersSubscription, checkDuplicatedUsersSubscription } = require("../models/usersSubscriptionDao");

// 구독 내역 추가(/payment/done)
const usersSubscriptionAdditionField = async (userId, dobbyBoxId) => {
    try {
        return await addUsersSubscription(userId, dobbyBoxId); // error 반환하면 catch로 빠진다.
    } catch (e) {
        console.error(e);
    }
}

// 구독 중복 체크
const duplicationVerifiedSubscription = async (userId, dobbyBoxId) => {
    try {
            const duplicatedSubscriptionId = await checkDuplicatedUsersSubscription(userId, dobbyBoxId); // 다른 창에서 같은 구독을 이미 시작했을 수도 있으므로 error handling
            if (duplicatedSubscriptionId.length) {
                throwErr(409, "ALREADY SUBSCRIBED DOBBYBOX");
            }
    } catch (e) {
        console.error(e);
    }
}


module.exports = { usersSubscriptionAdditionField, duplicationVerifiedSubscription }