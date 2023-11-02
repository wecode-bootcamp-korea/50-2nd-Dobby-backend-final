const userDao  = require('../models/userDao');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const mailPoster = nodeMailer.createTransport({
  service: 'Naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
      user: 'test_code@naver.com',
      pass: process.env.SECRET_PW
  }
});
const dotenv = require("dotenv");
dotenv.config();
const coolsms = require('coolsms-node-sdk');

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

  const token = jwt.sign({ userId: user[0].id, email: user[0].email, nickname: user[0].nickname }, process.env.SECRET_KEY);
  return {
    message: "LOG_IN_SUCCESS",
    token: token,
    email: user[0].email,
    userId: user[0].id,
    nickname: user[0].nickname
  };
};

const emailAuth = async ({email}) => {
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const number = randomNumber(111111, 999999);
  const existingUser = await userDao.findUserByEmail(email);
  if(!existingUser){
    throwError("NON_EXISTENT_USER",404)
  }; 

  const mailOption = { 
    from: 'test_code@naver.com',
    to: email,
    subject: 'Dobby 인증 관련 메일 입니다.',
    html: '<h1> 인증번호를 확인 후 홈페이지에서 입력해 주세요 </h1>' + '<h1>' + number + '</h1>'
  };

  await mailPoster.sendMail(mailOption);
  await userDao.insertEmaiAuth(email, number);

};

const emailVerifyNumber = async ({ email, number, newPassword }) => {
  console.log(number,email,newPassword)
  const authNumber = await userDao.getAuthNumberByEmail(email);
  if (number != authNumber) {
      throwError('인증 번호가 일치하지 않습니다.', 400);
  }
  
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  await userDao.updatePassword(email, hashedPassword);
  await userDao.deleteUserAuthNumberByEmail(email);
  return true;
};

const phoneAuth = async ({phoneNumber}) => {
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const number = randomNumber(111111, 999999);
  const existingUser = await userDao.findUserByPhonenumber(phoneNumber);
  if(!existingUser){
    throwError("NON_EXISTENT_USER",404)
  };

  const sendMessage = async () => {
    const SMS_KEY = process.env.API_KEY;
    const SMS_SECRET = process.env.API_SECRET;
    const SMS_SENDER = process.env.PHONE_NUMBER;

    const mySms = coolsms.default; 
    const messageService = new mySms(SMS_KEY, SMS_SECRET);
    const result = await messageService.sendOne({
        to: phoneNumber,
        from: SMS_SENDER,
        text: `안녕하세요 DOBBY입니다! 요청하신 인증번호는 ${number}입니다.`,
    })

    console.log(phoneNumber + '번호로 인증번호' + number + '을 전송합니다.');
  }
  await userDao.insertPhoneAuth(phoneNumber, number);
  await sendMessage();
};
  
const phoneVerifyNumber = async ({ phoneNumber, number }) => {
  console.log(phoneNumber,number);
  const authNumber = await userDao.getAuthNumberByPhoneNumber(phoneNumber);
  console.log(authNumber);
  if (number != authNumber) {
      throwError('인증 번호가 일치하지 않습니다.', 400);
  };
  
  const user = await userDao.findUserByPhonenumber(phoneNumber);
  await userDao.deleteUserAuthNumberByPhoneNumber(phoneNumber);
  return {
    message: "FIND_ID_SUCCESS",
    email: user[0].email
  }
};

module.exports ={
  signUp,
  logIn,
  emailAuth,
  emailVerifyNumber,
  phoneAuth,
  phoneVerifyNumber
};
