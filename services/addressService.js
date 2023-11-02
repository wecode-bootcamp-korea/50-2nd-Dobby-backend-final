// address를 Dao로부터 받아오는 함수
//  cartPaymentController에서 호출.

// const { throwErr } = require("../entity/utils")
const {findAddress} = require("../models/addressDao");

const  addressField = async (userId) => {
    try {
        return await findAddress(userId); // [] 빈 배열이어도 return
    } catch (e) {
        console.error(e)
    }

}



module.exports = { addressField }