const addressDao = require("../models/addressDao");

const  addressField = async (userId) => {
    return await addressDao.findAddress(userId); // [] 빈 배열이어도 return
}

module.exports = { addressField }