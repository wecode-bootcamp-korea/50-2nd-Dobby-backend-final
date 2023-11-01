// Dao에서 불러와서 Controller로 넘겨 주는 함수
// 명확한 return 값을 보내야 한다.

const { throwErr } = require("../entity/utils");
const { subscriptionInfo, findSubscriptionPrice} = require("../models/subscriptionDao");


const subscriptionField = async (dobbyBox) => {
    try {
        const subscription = await subscriptionInfo(dobbyBox);
        if (!subscription) {
            throwErr(404, "TARGET SUBSCRIPTION NOT FOUND");
        }
        return await subscription;
    } catch(e) {
        console.error(e);
    }
}

const foundSubscriptionNameField = async (dobbyBox) => {
    try {
        return await findSubscriptionPrice(dobbyBox);
    } catch (e) {
        console.error(e);
    }
}




module.exports = { subscriptionField, foundSubscriptionNameField }