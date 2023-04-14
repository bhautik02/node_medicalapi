const mongoose = require('mongoose');

const disLikeProductSchema = new mongoose.Schema({
  disLiked: {
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

const DislikeProduct = mongoose.model('DislikeProduct', disLikeProductSchema);

module.exports = DislikeProduct;
