// address를 Dao로부터 받아오는 함수
//  cartPaymentController에서 호출.

// const { throwErr } = require("../entity/utils")
const {findAddress, generateAddress} = require("../models/addressDao");

const  addressField = async (userId) => {
    try {
        return await findAddress(userId); // [] 빈 배열이어도 controller에서는 undefined로 return
    } catch (e) {
        console.error(e)
    }

}


const addressGenerationField = async (userId, content, phonenumber, name) => {
    try {
            return await generateAddress(userId, content, phonenumber, name); // error가 발생하면 catch로 빠진다.
    } catch (e) {
        console.error(e);
    }
}


module.exports = { addressField, addressGenerationField }