const express = require('express');
const productTypeController = require('./../controller/productTypeController');

const productTypeRouter = express.Router();

productTypeRouter
  .route('/')
  .get(productTypeController.getAllProductType)
  .post(productTypeController.createProductType);

productTypeRouter.route('/:id').delete(productTypeController.deleteProduct);

module.exports = { productTypeRouter };
