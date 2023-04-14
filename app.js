const express = require('express');
const morgan = require('morgan');
const { productRouter } = require('./routes/productRoute');
const { productTypeRouter } = require('./routes/productTypeRoute');
const { userRouter } = require('./routes/userRoute');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/product', productRouter);
app.use('/api/v1/productType', productTypeRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
