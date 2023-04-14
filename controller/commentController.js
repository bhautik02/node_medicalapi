const Comment = require('./../models/commentModel');

exports.createComment = async (req, res, next) => {
  try {
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
      data: {
        comment,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};
