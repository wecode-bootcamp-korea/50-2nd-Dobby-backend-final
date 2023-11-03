const appDataSource = require("./dataSource")


const checkDuplicate = async (userId, dobbyBoxId) => {
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

module.exports = {checkDuplicate, addUsersSubscription}