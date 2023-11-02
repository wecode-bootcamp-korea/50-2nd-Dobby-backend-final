const appDataSource = require('./dataSource');

const findUserById = async (userId) => {
    const query = `SELECT id, name FROM users WHERE id = '${userId}'`;
  return await appDataSource.query(query);
};

const findSubscriptionByName = async (subName) => {
  const query = `SELECT sub_name FROM subscription WHERE sub_name = '${subName}'`;
  return await appDataSource.query(query);
};

const subscriptionData = async (dobbyBox) => {
  try {
    return await appDataSource.query(
      `
        SELECT id,
        sub_price,
        sub_name
        FROM 
        subscription 
        WHERE sub_name = '${dobbyBox}'
        `
    )
  } catch(e) {
    console.error(e);
  }
}

const findSubscriptionPrice = async (dobbyBox) => {
  try {
    return await appDataSource.query(
    `
      SELECT 
      sub_price
      FROM 
      subscription 
      WHERE sub_name = '${dobbyBox}'
    `
    )
  } catch (e) {
    console.error(e);
  }
}


module.exports = { findUserById, findSubscriptionByName, subscriptionData, findSubscriptionPrice };
