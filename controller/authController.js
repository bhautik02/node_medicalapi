const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
  try {
    // let token;
    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.startsWith('Bearer')
    // ) {
    //   token = req.headers.authorization.split(' ')[1];
    // }
    // if (!token) {
    //   throw new Error('Please log in...');
    // }
    // // 2) Verification token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // // 3) Check if user still exists
    // const currentUser = await User.findById(decoded.id);
    // if (!currentUser) {
    //   throw new Error('The user belonging to this token does no longer exist.');
    // }
    // // GRANT ACCESS TO PROTECTED ROUTE
    // req.user = currentUser;
    // next();

    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      let user = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = user.id;
      console.log('Authentication Sucessfully');
    } else {
      return res.status(401).json({ message: 'Please log in...' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
  next();
};

module.exports = authentication;
