const userDao  = require('../models/userDao');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const signUp = async (data) => {
  const { email, password, name, phonenumber, nickname } = data;

  if (!name || !email || !password || !nickname) {
  throwError('All fields must be filled.', 400);
  }
  const existingUser = await userDao.findUserByEmail(email);
  if (existingUser.length>0) {
    throwError("ALREADY_EXIST_USER", 400);
  }
 
  const saltRounds = 12;
  const hashedPw = await bcrypt.hash(password, saltRounds);
  await userDao.createUser(email, hashedPw, name, phonenumber, nickname);
  return { message: "SIGN_UP_SUCCESS" };
};

const logIn = async (data) => {
  const { id, email, password } = data;

  if (!email || !password) {
    throwError("INVALID_ATTEMPT", 400);
  }

  const user = await userDao.findUserByEmail(email);
  if (!user) {
    throwError("NON_EXISTENT_USER", 400);
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);
  if (!isPasswordValid) {
    throwError("Entered password is not valid.", 400);
  }

  const token = jwt.sign({ userId: user[0].id, email: user[0].email }, process.env.SECRET_KEY);
  return {
    message: "LOG_IN_SUCCESS",
    token: token,
    email: user[0].email,
    userId: user[0].id
  };
};

module.exports ={
  signUp,
  logIn
};
