const LikeProduct = require('../models/likeProductModel');
const Product = require('../models/productModel');
const DislikeProduct = require('./../models/disLikedProductModel');

exports.likeProduct = async (req, res, next) => {
  try {
    // console.log(req.userId);
    const product = await LikeProduct.findOne({
      product: req.params.id,
      user: req.userId,
    });

    if (product) {
      throw new Error('You already liked this Product.');
    }

    const like = await LikeProduct.create({
      liked: req.body.liked,
      user: req.userId,
      product: req.params.id,
    });

    const LikeAdded = await LikeProduct.findOne({
      product: req.params.id,
      user: req.userId,
    });
    // console.log(disLikeAdded);

    if (LikeAdded) {
      const product1 = await DislikeProduct.findOneAndDelete({
        product: req.params.id,
        user: req.userId,
      });

      res.status(201).json({
        status: 'success',
        message: 'Your Like has been added.',
      });
    } else {
      throw new Error('Something went wrong.');
    }
  } catch (error) {
    return res.status(403).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.disLikeProduct = async (req, res, next) => {
  try {
    const product = await DislikeProduct.findOne({
      product: req.params.id,
      user: req.userId,
    });

    if (product) {
      throw new Error('You already disLiked this Product.');
    }

    const disLike = await DislikeProduct.create({
      disLiked: req.body.disLiked,
      user: req.userId,
      product: req.params.id,
    });

    const disLikeAdded = await DislikeProduct.findOne({
      product: req.params.id,
      user: req.userId,
    });
    console.log(disLikeAdded);

    if (disLikeAdded) {
      const product1 = await LikeProduct.findOneAndDelete({
        product: req.params.id,
        user: req.userId,
      });

      res.status(201).json({
        status: 'success',
        message: 'Your disLike has been added.',
      });
    } else {
      throw new Error('Something went wrong.');
    }
  } catch (error) {
    return res.status(403).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.mostLikedProduct = async (req, res, next) => {
  try {
    const product = await LikeProduct.aggregate([
      {
        $group: {
          _id: '$product',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    if (!product) {
      throw new Error('Users Not liked any product...');
    }

    const mostLikedProduct = await Product.findById(product[0]._id);

    if (!mostLikedProduct) {
      throw new Error(
        'facing Isuue to get mostLikedProduct, please try again...'
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        likes: product[0].count,
        mostLikedProduct,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: 'please try again...',
    });
  }
};
