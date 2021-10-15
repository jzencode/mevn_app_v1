const express = require('express');
const router = express.Router();
const {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/api');
const multer = require('multer');

// multer middleware
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single('image');

router.get('/', fetchAllProducts);
router.get('/:id', fetchProductById);
router.post('/', upload, createProduct);
router.patch('/:id', upload, updateProduct);
router.delete('/:id', deleteProduct);


module.exports = router;
