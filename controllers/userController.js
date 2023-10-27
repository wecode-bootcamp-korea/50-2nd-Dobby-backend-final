const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const result = await userService.signUp(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const logIn = async (req, res) => {
  try {
    const result = await userService.logIn(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { signUp, logIn };

// 왜 개발자가 되고싶은가요?
// 어떤 개발자가 되고 싶은가요?