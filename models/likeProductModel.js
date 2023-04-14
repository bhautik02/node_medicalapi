const mongoose = require('mongoose');

const likeProductSchema = new mongoose.Schema({
  liked: {
    type: Boolean,
    default: false,
    enum: [true, false],
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
});

const LikeProduct = mongoose.model('Like', likeProductSchema);

module.exports = LikeProduct;
