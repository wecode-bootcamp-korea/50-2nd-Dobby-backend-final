const usersSubscriptionDao = require("../models/usersSubscriptionDao")
const error = require("../utils/error")

const checkDuplication = async (userId, dobbyBoxId) => {
  try {
    const duplicatedSubscriptionId = await usersSubscriptionDao.checkDuplicate(userId, dobbyBoxId); // 다른 창에서 같은 구독을 이미 시작했을 수도 있으므로 error handling
    if (duplicatedSubscriptionId.length) {
      error.throwError(409, "ALREADY SUBSCRIBED DOBBYBOX");
    }
  } catch (e) {
    console.error(e);
  }
}

const addSubscription = async (userId, dobbyBoxId) => {
  try {
    return await usersSubscriptionDao.addUsersSubscription(userId, dobbyBoxId); // error 반환하면 catch로 빠진다.
  } catch (e) {
    console.error(e);
  }
}

module.exports = { checkDuplication, addSubscription}