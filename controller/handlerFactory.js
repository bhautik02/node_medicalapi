exports.getAll = Model => async (req, res, next) => {
  try {
    const docs = await Model.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs,
      },
    });

    if (!docs) {
      throw new Error('ProductList is empty...');
    }
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.getOne = Model => async (req, res, next) => {
  try {
    let doc = await Model.findById(req.params.id)
      .populate({
        path: 'productType',
        select: 'productType',
      })
      .populate('comment');

    if (!doc) {
      throw new Error("Product with this id doesn't exists...");
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.createOne = Model => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);

    if (!doc) {
      throw new Error('Product not created, please try again...');
    }

    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.deleteOne = Model => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      throw new Error('Product not deleted, please try again...');
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.updateOne = Model => async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      throw new Error('Product not updated, please try again...');
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};
