const appDataSource = require("./dataSource")
const findAddress = async (userId) => {
    try {
        return await appDataSource.query(
          `
        SELECT 
        address.id, 
        address.users_id, 
        address.phonenumber, 
        address.name, 
        address.content
        FROM 
        address 
        WHERE 
        address.users_id = '${userId}'
        `
        )
    } catch (e) {
        console.error(e)
    }
} // **중요** address.phonenumber VARCHAR(50) NOT NULL로 바꾸겠습니다. (DB에서 integer SELECT 한 이후에 string으로 수정해서 "0" + "1012345678" 하는 것보다 나음.

const addAddress = async (userId, content, phonenumber, name) => {
    try {
        return await appDataSource.query(
          `
            INSERT 
            INTO 
            address(users_id, content, phonenumber, name) 
            VALUES 
            (
            '${userId}', 
            '${content}', 
            '${phonenumber}', 
            '${name}'
            );
            `
        )
    } catch (e) {
        console.error(e);
    }
}

module.exports = { findAddress, addAddress } //////////////////