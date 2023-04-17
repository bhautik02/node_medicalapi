const handlerFactory = require('./handlerFactory');
const User = require('./../models/UserModel');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../utils/email');
const bcrypt = require('bcryptjs');

exports.getAllUser = handlerFactory.getAll(User);

exports.signup = async (req, res, next) => {
  try {
    password = req.body.password;
    if (password.includes(' ')) {
      throw new Error(
        'You can not enter space as a password, Change your password!!!'
      );
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    });

    await sendEmail({
      email: newUser.email,
      subject: 'You have Registered successfully...',
      message: `WELCOME ${newUser.name}\nId:${newUser.email}\nPassword:${newUser.password}`,
    });

    res.status(200).json({
      status: 'success',
      message: `You have Register successfully. For more information check your mail...`,
    });
  } catch (error) {
    res.status(401).json({
      status: 'failed',
      message: 'User not Created due to some error, please trin again later..',
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new Error('provide email and password');
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Incorrect email or password');
    }

    // 3) If everything ok, send token to client
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: 'success',
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({
      status: 'failed',
      message: 'User not login due to some error, please try again later..',
    });
  }
};
