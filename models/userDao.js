const { appDataSource } = require('./dataSource');

const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  return await appDataSource.query(query);
};

const createUser = async (email, hashedPw, name, phonenumber, nickname) => {
  const query = `
    INSERT INTO users (
      email,
      password,
      name,
      phonenumber,
      nickname
    )
    VALUES(
      '${email}',
      '${hashedPw}',
      '${name}',
      '${phonenumber}',
      '${nickname}'
    )
  `;
  
  return await appDataSource.query(query);
};

module.exports = { createUser, findUserByEmail };
