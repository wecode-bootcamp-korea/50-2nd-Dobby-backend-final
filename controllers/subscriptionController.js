const subscriptionService = require('../services/subscriptionService');

const subscription = async (req, res) => {
  try {
    const result = await subscriptionService.getSubscription(req.headers, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { subscription };
