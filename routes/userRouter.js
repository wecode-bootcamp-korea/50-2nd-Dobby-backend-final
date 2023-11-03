const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);

router.post('/phoneauth',userController.phoneAuth);
router.post('/phoneauth/phoneverifynumber',userController.phoneVerifyNumber);

router.post('/emailauth',userController.emailAuth);
router.post('/emailauth/emailverifynumber',userController.emailVerifyNumber);

module.exports.router = router;