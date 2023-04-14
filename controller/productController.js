const handlerFactory = require('./handlerFactory');
const Product = require('./../models/productModel');
const mongoose = require('mongoose');

exports.getAllProduct = handlerFactory.getAll(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);
exports.getProduct = handlerFactory.getOne(Product);

// exports.createProduct = handlerFactory.createOne(Product);

exports.createProduct = async (req, res, next) => {
  try {
    const productImage = req.file.filename;
    const product = await Product.create({
      productName: req.body.productName,
      expireDate: req.body.expireDate,
      price: req.body.price,
      description: req.body.description,
      productImage,
      productType: req.body.productType,
      createdAt: Date.now(),
    });
    // const product = await Product.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.getProductByProductType = async (req, res, next) => {
  try {
    console.log(req.params.productType);
    let product = await Product.aggregate([
      {
        $match: {
          productType: new mongoose.Types.ObjectId(req.params.productType),
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.mostRecentProduct = async (req, res, next) => {
  try {
    const product = await Product.find(
      {},
      {
        _id: 1,
        productName: 1,
        productType: 1,
        createdAt: 1,
      }
    ).sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      data: {
        product: product[0],
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};
