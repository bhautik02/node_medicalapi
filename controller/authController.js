const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      let user = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = user.id;
    } else {
      return res.status(401).json({
        status: 'failed',
        message: 'Please log in...',
      });
    }
  } catch (error) {
    res.status(401).json({
      status: 'failed',
      message: error.message,
    });
  }
  next();
};

module.exports = authentication;
