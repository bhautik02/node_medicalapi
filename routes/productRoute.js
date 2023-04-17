const express = require('express');
const productController = require('./../controller/productController');
const commentController = require('./../controller/commentController');
const likeController = require('../controller/likeProductController');
const authentication = require('./../controller/authController');
const { upload } = require('./../controller/imageController');

const productRouter = express.Router();

/**
 * /test-Product
 * 2 products
 */

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
productRouter.get('/test-product', productController.testMethod);

productRouter
  .route('/:id')
  .get(productController.getProduct)
  .delete(authentication, productController.deleteProduct)
  .patch(authentication, productController.updateProduct);

productRouter
  .post('/:id/comment', authentication, commentController.createComment)
  .post('/:id/like', authentication, likeController.likeProduct)
  .post('/:id/disLike', authentication, likeController.disLikeProduct);

productRouter
  .route('/productByType/:productType')
  .get(productController.getProductByProductType);

module.exports = { productRouter };
