const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producttype',
    },
    productName: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A product name must have less or equal then 40 characters',
      ],
      minlength: [
        5,
        'A product name must have more or equal then 10 characters',
      ],
    },
    expireDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    description: {
      type: String,
      trim: true,
    },
    productImage: {
      type: String,
      required: [true, 'A product must have a cover image'],
    },
    createdAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('comment', {
  ref: 'Comment',
  foreignField: 'product',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
