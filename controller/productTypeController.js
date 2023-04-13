const handlerFactory = require('./handlerFactory');
const ProductType = require('../models/productTypeModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

exports.getAllProductType = handlerFactory.getAll(ProductType);
exports.createProductType = handlerFactory.createOne(ProductType);

exports.deleteProduct = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    let product = await Product.aggregate([
      {
        $match: {
          productType: new mongoose.Types.ObjectId(req.params.id),
        },
      },
    ]);

    if (product.length !== 0) {
      return res.status(404).json({
        status: 'failed',
        message: `You can't delete this Type...`,
      });
    }
    const doc = await ProductType.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        data: null,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};
