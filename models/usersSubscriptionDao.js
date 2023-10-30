// HTTP POST, PATCH에 대한 HTTP RESPONSE를 위한 함수
// HTTP RESPONSE 204를 반환한다.

const { appDataSource } = require("../entity/utils")

const addUsersSubscription = async (userId, dobbyBoxId) => {
    try {
            return await appDataSource.query(
                `
                INSERT INTO 
                users_subscription(users_id, subscription_id) 
                VALUES 
                (
                '${userId}', 
                '${dobbyBoxId}'
                )
                `
            )
    } catch (e) {
        console.error(e);
    }
}

const checkDuplicatedUsersSubscription = async (userId, dobbyBoxId) => {
    try {
            return await appDataSource.query(
                `
                SELECT id 
                FROM users_subscription 
                WHERE 
                users_id = '${userId}' AND subscription_id = '${dobbyBoxId}'
                `
            )
    } catch (e) {
        console.error(e);
    }
}

module.exports = { addUsersSubscription, checkDuplicatedUsersSubscription }