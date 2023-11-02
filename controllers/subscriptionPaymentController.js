const error = require("../utils/error")
const auth = require("../utils/auth");
const subscriptionService = require("../services/subscriptionService")
const addressService = require("../services/addressService");
const userService = require("../services/userService");
const usersSubscriptionService = require("../services/usersSubscriptionService")
const secretKey = process.env.SECRET_KEY;

const subscriptionInfo = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const accessToken = auth.decoded(token, secretKey)
    const userId = accessToken["userId"];

    const { dobbyBox }= req.query;


    if (dobbyBox !== "basic" && dobbyBox !== "creative" && dobbyBox !== "collection") {
      error.throwError(404, "QUERY TARGET SUBSCRIPTION DOES NOT EXIST OR THE TARGET IS INVALID");
    }

    const result = [];
    const resultObj = {};
    // Subscription
    const sendSubscription = await subscriptionService.sendSubscription(dobbyBox);
    // Address
    resultObj["address"] =  await addressService.addressField(userId);
    // Credit
    resultObj["credit"] = await userService.creditField(userId);

    resultObj["subscription"] = sendSubscription[0];

    result[0] = resultObj;
    // Error Handling 끝
    return res.status(200).json({message: "GET - RESPONSE SUCCESS", data: result}); // data: [subscription: {sub_to}]


  } catch (e) {
    console.error(e);
    return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET : /payment?dobbyBox=.."});

  }
}

const subscriptionPaymentDone = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const accessToken = auth.decoded(token, secretKey)
    const userId = accessToken["userId"];
    const dobbyBox = req.body.query;

    let dobbyBoxId = 0
    if (dobbyBox ==="basic") {
      dobbyBoxId += 1;
    }
    else if (dobbyBox === "creative") {
      dobbyBoxId += 1;
    }
    else if (dobbyBox === "collection") {
      dobbyBoxId += 1;
    }
    else {
      console.log(dobbyBox + " dobbyBox POST REQUEST RECEIVED")
    }
    // READ users_subscription
    const duplicationCheck = await usersSubscriptionService.checkDuplication(userId, dobbyBoxId); // error 반환 시 catch로 빠진다.
    // UDPATE users(credit)
    const finishCredit = await userService.updateCredit(userId, subscriptionService.findSubscriptionPrice(dobbyBox));
    // POST USERS_SUBSCRIPTION(DATA)
    const doneUsersSubscription = await usersSubscriptionService.addSubscription(userId, dobbyBoxId);

    return res.status(200).json({message: "PAYMENT SUCEESS"})
  } catch (e) {
    console.error(e);
    return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - POST : /payment"});
  }
}

const addAddress = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const accessToken = auth.decoded(token, secretKey)
    const userId = accessToken["userId"];

    const { content, phonenumber, name } = req.body;
    if (!content || !phonenumber || !name) {
      error.throwError(404, "NO ADDRESS RECEIVED");
    }
    const addressAddition = await addressService.addAddress(userId, content, phonenumber, name);
    return res.status(200).json({message: "POST - ADDRESS ADDED SUCCESS"});
  } catch (e) {
    console.error(e);
    return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - POST: /payment/address/done"})
  }
}

const getAddress = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const accessToken = auth.decoded(token, secretKey)
    const userId = accessToken["userId"];

    const result = [];
    const resultObj = {};
    const addressDataField = await addressService.addressField(userId);
    resultObj["address"] = addressDataField;
    result[0] = resultObj;
    return res.status(200).json({message: "ADDRESS SEND SUCCESS", data: result})
  } catch (e) {
    console.error(e);
    return res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET: /payment/address"})

  }
}

module.exports = { subscriptionInfo, subscriptionPaymentDone, addAddress, getAddress }