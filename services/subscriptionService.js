const subscriptionDao = require('../models/subscriptionDao');
const jwt = require('jsonwebtoken');
const auth = require('../utils/auth');
const secretkey = process.env.SECRET_KEY;

const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const getSubscription = async (headers, query) => {
  if (!headers.authorization) {
    throwError("로그인해 주세요", 401);
  };
  
  try {
    const token = headers.authorization;
    const decoded = auth.decoded(token, secretkey);
    const userId = decoded.userId;
    const subName = query.dobbyBox;
    const user = await subscriptionDao.findUserById(userId);
    const existingSubscription = await subscriptionDao.findSubscriptionByName(
      subName
    );
    if (!user) {
      throwError("UNAUTHORIZED", 401);
    };
    if (!existingSubscription) {
      throwError("해당 구독은 이용하실 수 없습니다.", 400);
    };
    return { redirectUrl: `http://127.0.0.1:3000/payment?dobbyBox=${subName}` };
  } catch (err) {
    throwError("Invalid Token", 401);
  }
};

const sendSubscription = async (dobbyBox) => {
    try {
      const subscription = await subscriptionDao.subscriptionData(dobbyBox);
      if (!subscription) {
        throwError(404, "TARGET SUBSCRIPTION NOT FOUND");
      }
      return await subscription;
    } catch(e) {
      console.error(e);
    }
}

const findSubscriptionPrice = async (dobbyBox) => {
  try {
    const foundPrice = await subscriptionDao.findSubscriptionPrice(dobbyBox);
    const subscriptionPrice = foundPrice[0]["sub_price"];
    return await subscriptionPrice;
  } catch (e) {
    console.error(e);
  }
}

module.exports = { getSubscription, sendSubscription, findSubscriptionPrice };
