const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'utils/uploadFiles');
  },
  filename: (req, file, cb) => {
    cb(null, `product-${req.userId}-${Date.now()}.jpeg`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    console.log(file.mimetype);
    cb(null, true);
  } else {
    cb(new Error('please upload only image files..'), false);
  }
};

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
