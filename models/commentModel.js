const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
