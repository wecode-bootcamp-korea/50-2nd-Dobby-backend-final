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


module.exports = { findAddress }