const { appDataSource } = require("./dataSource")
const findAddress = async (userId) => {
    return await appDataSource.query(
        `
        SELECT 
        address.id, 
        address.users_id, 
        address.phonenumber, 
        address.name 
        FROM 
        address 
        WHERE 
        address.users_id = '${userId}'
        `
    )
} // **중요** address.phonenumber VARCHAR(50) NOT NULL로 바꾸겠습니다. (DB에서 integer SELECT 한 이후에 string으로 수정해서 "0" + "1012345678" 하는 것보다 나음.


module.exports = { findAddress }