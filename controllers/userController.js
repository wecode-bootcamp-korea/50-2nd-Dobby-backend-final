const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const result = await userService.signUp(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const logIn = async (req, res) => {
  try {
    const result = await userService.logIn(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};


module.exports = { 
  signUp, 
  logIn
};

