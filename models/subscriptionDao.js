const { appDataSource } = require('./dataSource');

const findUserById = async (userId) => {
    const query = `SELECT id, name FROM users WHERE id = '${userId}'`;
  return await appDataSource.query(query);
};

const findSubscriptionByName = async (subName) => {
  const query = `SELECT sub_name FROM subscription WHERE sub_name = '${subName}'`;
  return await appDataSource.query(query);
};

module.exports = { findUserById, findSubscriptionByName };
