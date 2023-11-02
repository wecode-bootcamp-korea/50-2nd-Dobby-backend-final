const addressDao = require("../models/addressDao");


const addressField = async (userId) => {
    return await addressDao.findAddress(userId); // [] 빈 배열이어도 return
}


const addAddress = async (userId, content, phonenumber, name) => {
    try {
        return await addressDao.addAddress(userId, content, phonenumber, name);
    } catch (e) {
        console.error(e);
    }
}



module.exports = { addAddress, addressField }