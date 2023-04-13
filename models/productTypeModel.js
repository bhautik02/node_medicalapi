const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
  productType: {
    type: String,
    unique: [true, 'productType allready exist..'],
    enum: ['shampoo', 'capsule', 'oximeter', 'device'],
  },
});

const Producttype = mongoose.model('Producttype', productTypeSchema);

module.exports = Producttype;
