<<<<<<< HEAD
const appDataSource = require('./dataSource');
const mysql = require('mysql2/promise');

const findCredit = async (userId) => {                          // 요청한 브라우저의 유저의 Credit(포인트)를 반환한다.
  return await appDataSource.query(
      `
      SELECT credit 
      FROM 
      users 
      WHERE 
      id = '${userId}'
      `
  )
}

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

const findUserByPhonenumber = async (phoneNumber) => {
  let formattedNumber = phoneNumber.startsWith("0") ? phoneNumber.substring(1) : phoneNumber;
  const query = `SELECT * FROM users WHERE phonenumber = '${formattedNumber}'`;
  return await appDataSource.query(query);
}

const insertEmaiAuth = async (email, number) => {
  const query = `
    INSERT INTO auth_table (email, auth_code) 
    VALUES ('${email}', '${number}')
  `;
  return await appDataSource.query(query);
};

const insertPhoneAuth = async (phoneNumber, number) => {
  const query = `
    INSERT INTO auth (phonenumber, auth_code) 
    VALUES ('${phoneNumber}', '${number}')
  `;
  return await appDataSource.query(query);
};

const getAuthNumberByEmail = async (email) => {
  const query = `SELECT auth_code FROM auth_table WHERE email = '${email}'`;
  const rows = await appDataSource.query(query);

  if (rows.length === 0) return null;
  return rows[0].auth_number;
};

const getAuthNumberByPhoneNumber= async (phoneNumber) => {
  const query = `SELECT auth_code FROM auth WHERE phonenumber = '${phoneNumber}'`;
  const rows = await appDataSource.query(query);

  if (rows.length === 0) return null;
  return rows[0].auth_code;
};

const updatePassword = async (email, hashedPassword) => {
  const query = `UPDATE users SET password = '${hashedPassword}' WHERE email = '${email}'`;
  await appDataSource.query(query);
};

const deleteUserAuthNumberByEmail = async (email) => {
  const query = "DELETE FROM auth WHERE email = ?";
  await appDataSource.query(query, [email]);
};

const deleteUserAuthNumberByPhoneNumber = async (phoneNumber) => {
  const query = "DELETE FROM auth WHERE phonenumber = ?";
  await appDataSource.query(query, [phoneNumber]);
};


module.exports = {
  createUser,
  findUserByEmail,
  insertEmaiAuth,
  getAuthNumberByEmail,
  updatePassword,
  deleteUserAuthNumberByEmail,
  deleteUserAuthNumberByPhoneNumber,
  findUserByPhonenumber,
  insertPhoneAuth,
  getAuthNumberByPhoneNumber,
  findCredit
}
=======
const appDataSource = require('./dataSource');
const mysql = require('mysql2/promise');

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

const findUserByPhonenumber = async (phoneNumber) => {
  let formattedNumber = phoneNumber.startsWith("0") ? phoneNumber.substring(1) : phoneNumber;
  const query = `SELECT * FROM users WHERE phonenumber = '${formattedNumber}'`;
  return await appDataSource.query(query);
}

const insertEmaiAuth = async (email, number) => {
  const query = `
    INSERT INTO auth_table (email, auth_code) 
    VALUES ('${email}', '${number}')
  `;
  return await appDataSource.query(query);
};

const insertPhoneAuth = async (phoneNumber, number) => {
  const query = `
    INSERT INTO auth (phonenumber, auth_code) 
    VALUES ('${phoneNumber}', '${number}')
  `;
  return await appDataSource.query(query);
};

const getAuthNumberByEmail = async (email) => {
  const query = `SELECT auth_code FROM auth_table WHERE email = '${email}'`;
  const rows = await appDataSource.query(query);

  if (rows.length === 0) return null;
  return rows[0].auth_number;
};

const getAuthNumberByPhoneNumber= async (phoneNumber) => {
  const query = `SELECT auth_code FROM auth WHERE phonenumber = '${phoneNumber}'`;
  const rows = await appDataSource.query(query);

  if (rows.length === 0) return null;
  return rows[0].auth_code;
};

const updatePassword = async (email, hashedPassword) => {
  const query = `UPDATE users SET password = '${hashedPassword}' WHERE email = '${email}'`;
  await appDataSource.query(query);
};

const deleteUserAuthNumberByEmail = async (email) => {
  const query = "DELETE FROM auth WHERE email = ?";
  await appDataSource.query(query, [email]);
};

const deleteUserAuthNumberByPhoneNumber = async (phoneNumber) => {
  const query = "DELETE FROM auth WHERE phonenumber = ?";
  await appDataSource.query(query, [phoneNumber]);
};


module.exports = { 
  createUser,
  findUserByEmail,
  insertEmaiAuth, 
  getAuthNumberByEmail, 
  updatePassword,
  deleteUserAuthNumberByEmail,
  deleteUserAuthNumberByPhoneNumber,
  findUserByPhonenumber,
  insertPhoneAuth,
  getAuthNumberByPhoneNumber
};
>>>>>>> main
