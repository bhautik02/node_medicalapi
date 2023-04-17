const Comment = require('./../models/commentModel');

exports.createComment = async (req, res, next) => {
  try {
    const comments = await Comment.findOne({
      product: req.params.id,
      user: req.userId,
    });

    if (comments) {
      throw new Error('You already commneted on this Product.');
    }

    const comment = await Comment.create({
      comment: req.body.comment,
      product: req.params.id,
      user: req.userId,
    });

    if (!comment) {
      throw new Error('Comment not created, please try again...');
    }

    res.status(201).json({
      status: 'success',
      comment,
    });
  } catch (error) {
    return res.status(403).json({
      status: 'failed',
      message:
        'Your comment is not added due to some problem, please try again later.',
    });
  }
};
