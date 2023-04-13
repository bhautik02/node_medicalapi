const express = require('express');
const productController = require('./../controller/productController');
const commentController = require('./../controller/commentController');
const likeController = require('../controller/likeProductController');
const authentication = require('./../controller/authController');
const { upload } = require('./../controller/imageController');

const productRouter = express.Router();

productRouter
  .route('/')
  .get(productController.getAllProduct)
  .post(
    authentication,
    upload.single('productImages'),
    productController.createProduct
  );

productRouter
  .route('/most-recent-product')
  .get(productController.mostRecentProduct);

productRouter.route('/most-liked-product').get(likeController.mostLikedProduct);

productRouter
  .route('/:id')
  .get(productController.getProduct)
  .delete(authentication, productController.deleteProduct)
  .patch(authentication, productController.updateProduct);

productRouter
  .post('/:id/comment', authentication, commentController.createComment)
  .post('/:id/like', authentication, likeController.likeProduct);

productRouter
  .route('/productByType/:productType')
  .get(productController.getProductByProductType);

module.exports = { productRouter };
