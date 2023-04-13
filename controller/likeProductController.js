const LikeProduct = require('../models/likeProduct');

exports.likeProduct = async (req, res, next) => {
  try {
    if (req.body.liked === 'false') {
      throw new Error('You have not liked Product...');
    }

    const product = await LikeProduct.findOne({ product: req.params.id });
    let like;

    if (!product) {
      like = await LikeProduct.create({
        liked: req.body.liked,
        product: req.params.id,
        likesQuantity: 1,
      });
    } else {
      let totalLikes = product.likesQuantity;
      totalLikes++;
      like = await LikeProduct.updateOne(
        { product: req.params.id },
        { likesQuantity: totalLikes }
      );
    }

    res.status(201).json({
      status: 'success',
      message: 'Your like has been added.',
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.disLikeProduct = async (req, res, next) => {
  try {
    if (req.body.disLiked === 'false') {
      throw new Error('You have not disLiked Product...');
    }

    const product = await LikeProduct.findOne({ product: req.params.id });
    let like;

    if (!product) {
      like = await LikeProduct.create({
        product: req.params.id,
        disLiked: true,
      });
    } else {
      let totalLikes = product.likesQuantity;
      totalLikes -= 1;
      if (totalLikes < 0) totalLikes = 0;
      like = await LikeProduct.updateOne(
        { product: req.params.id },
        { likesQuantity: totalLikes }
      );
    }

    res.status(201).json({
      status: 'success',
      message: 'Your disLike has been added.',
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.mostLikedProduct = async (req, res, next) => {
  try {
    const product = await LikeProduct.find(
      {},
      {
        _id: 1,
        likesQuantity: 1,
        product: 1,
        createdAt: 1,
      }
    )
      .sort({ likesQuantity: -1 })
      .populate('product');

    res.status(200).json({
      status: 'success',
      data: {
        mostLikedProduct: product[0],
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};
