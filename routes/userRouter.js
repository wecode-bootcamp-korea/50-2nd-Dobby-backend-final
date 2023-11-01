const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);

router.post('/emailauth',userController.emailAuth);
router.post('/emailauth/emailverifyNumber',userController.emailVerifyNumber);

router.post('/phoneauth',userController.phoneAuth);
router.post('/phoneauth/phoneverifynumber',userController.phoneVerifyNumber);


module.exports.router = router;