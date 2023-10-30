// /payment 이하의 계층에서 작동하는 함수
// Persistence Layer
const { throwErr } = require("../entity/utils")
const { creditField } = require("../services/userService");
const { addressField, addressGenerationField} = require("../services/addressService");
const { subscriptionField}  = require("../services/subscriptionService");
const { duplicationVerifiedSubscription, usersSubscriptionAdditionField } = require("../services/usersSubscriptionService");

const subscriptionPayment = async (req, res) => {
    try {
        // const userId = req.foundUser;
        const userId = req.body.id; // 임시로 req.body에서 받아서 사용

        // // qs module로 query value parsing
        // const dobbyBox = getParam(req.url, "dobbyBox");
        const dobbyBox = req.query.dobbyBox;


        if (dobbyBox !== "basic" && dobbyBox !== "creative" && dobbyBox !== "collection") {
            throwErr(404, "QUERY TARGET SUBSCRIPTION DOES NOT EXIST OR THE TARGET IS INVALID");
        }
        else {
            console.log(dobbyBox + " dobbyBox POST REQUEST RECEIVED");

        }
        const result = [];
        const resultObj = {};

        const subscription = await subscriptionField(dobbyBox); // [전처리 단수] => [{"":"", "":"", ..}] => id, sub_type,sub_price, sub_content
        const userAddressList = await addressField(userId);  // [전처리 복] => address Info 여러 개를 array로 가진다. 복수형 빈 array도 그대로 json에 담아 보낸다. 브라우저에 설정해 주면 된다.
        const userCreditInt = await creditField(userId);  // [전처리 1] => Credit Int 한 개만 value로 가진다. 빈 array일 경우에는 error Handling 통해서 HTTP code 401에 메시지를 보내도록 해 놓았다.

        resultObj["subscription"] = subscription;
        resultObj["address"] = userAddressList;
        resultObj["credit"] = userCreditInt;
        result[0] = resultObj;
        // Error Handling 끝
        res.json({message: "RECEIVING REQUEST SUCCESS", data: result}); // data: [subscription: {sub_to}]


    } catch (e) {
        console.error(e);
        res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - GET : /payment?dobbyBox=.."});

    }
}


const subscriptionPaymentDone = async (req, res) => {
    try {
        // const userId = req.foundUser;
        const userId = req.body.id; // 임시로 req.body에서 받아서 사용


        // // qs module로 query value parsing
        // const dobbyBox = getParam(req.url, "dobbyBox");
        const dobbyBox = req.body.query;

        // if (dobbyBox !== "basic" && dobbyBox !== "creative" && dobbyBox !== "collection") {
        //     throwErr(404, "QUERY TARGET SUBSCRIPTION DOES NOT EXIST OR THE TARGET IS INVALID");
        // }
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

        const duplicationVerifiedSub = await duplicationVerifiedSubscription(userId, dobbyBoxId); // error 반환 시 catch로 빠진다.
        const doneUsersSubscription = await usersSubscriptionAdditionField(userId, dobbyBoxId);

    } catch (e) {
        console.error(e);
        res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - POST : /payment/done"});

    }
}

const paymentAddressFieldGeneration = async (req, res) => { // subscription address를 따로 만들어야 될 것 같다.
    try {
        // const userId = req.foundUser;
        const userId = req.body.id; // 임시로 req.body에서 받아서 사용

        // payment/address/done으로 request.body에 content, phonenumber, name이 담긴 POST REQUEST가 오지 않으면
        const { content, phonenumber, name } = req.body;
        if (!content && !phonenumber && !name) {
            throwErr(400, "BAD REQUEST");
        }
        const genAddressField = await addressGenerationField(userId, content, phonenumber, name); // error가 반환되면 catch로 빠진다.

        res.status(204).json({message: "ADDRESS ADDED SUCCESS"});
    } catch (e) {
        console.error(e);
        res.status(e.statusCode || 500).json({message: e.message || "Error in invocation of API - POST: /payment/address/done"})
    }
}


// /payment/ping Health Check
// const pingPong = async (req, res) => {
//     res.json({message: "pong"})
// }


module.exports = { subscriptionPayment, subscriptionPaymentDone, paymentAddressFieldGeneration }