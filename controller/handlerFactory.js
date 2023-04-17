exports.getAll = Model => async (req, res, next) => {
  try {
    const products = await Model.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: products.length,
      products,
    });

    if (!products) {
      throw new Error('ProductList is empty...');
    }
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message:
        'Products not found due to some error, please try again later...',
    });
  }
};

exports.getOne = Model => async (req, res, next) => {
  try {
    let product = await Model.findById(req.params.id)
      .populate({
        path: 'productType',
        select: 'productType',
      })
      .populate('comment');

    if (!product) {
      throw new Error("Product with this id doesn't exists...");
    }

    res.status(200).json({
      status: 'success',
      product,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: 'Product not found with this ID, please check your id...',
    });
  }
};

exports.createOne = Model => async (req, res, next) => {
  try {
    const product = await Model.create(req.body);

    if (!product) {
      throw new Error('Product not created, please try again...');
    }

    res.status(201).json({
      status: 'success',
      product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(404).json({
        status: 'failed',
        message: 'Product with this id already exists.',
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(404).json({
        status: 'failed',
        message: error.message,
      });
    }
    return res.status(404).json({
      status: 'failed',
      error,
    });
  }
};

exports.deleteOne = Model => async (req, res, next) => {
  try {
    const product = await Model.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new Error(
        "Product with this id doesn't exists, please check again..."
      );
    }

    res.status(200).json({
      status: 'success',
      message: 'Product successfully deleted...',
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: 'Product is not deleted, please try again later...',
    });
  }
};

exports.updateOne = Model => async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const product = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      throw new Error(
        "Product with this id doesn't exists, please try again..."
      );
    }

    res.status(200).json({
      status: 'success',
      product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(404).json({
        status: 'failed',
        message: 'Product with this id already exists.',
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(404).json({
        status: 'failed',
        message: error.message,
      });
    }
    return res.status(404).json({
      status: 'failed',
      error,
    });
  }
};
