const {appDataSource} = require("../entity/utils");
const findAddress = async (userId) => {
    try {   // return => [{"":"", "":"", ..}]
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
        );
    } catch (e) {
        console.error(e);
    }
}


const generateAddress = async (userId, content, phoenumber, name) => {
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
                '${phoenumber}', 
                '${name}'
                );
                `
            )
    } catch (e) {
        console.error(e);
    }
}

module.exports = { findAddress, generateAddress }