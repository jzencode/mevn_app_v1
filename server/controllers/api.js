const Product = require('../models/Product');
const fs = require('fs');


exports.fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const product = req.body;
  const imageName = req.file.filename;
  product.image = imageName;
  try {
    await Product.create(product);
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundProduct = await Product.findById({ _id: id})
    res.status(200).json(foundProduct)
  } catch (error) {
    res.status(404).json({message: error.message})
  }

};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  let new_image = '';
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync('./uploads/'+req.body.old_image)
    } catch (error) {
      console.log(error);
    }
  } else {
    new_image = req.body.old_image;
  }
  const editProduct = req.body;
  editProduct.image = new_image;

  try {
    await Product.findByIdAndUpdate(id, editProduct)
    res.status(200).json({message: 'Product updated successfully'})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findByIdAndDelete(id)
    if (result.image !== '') {
      try {
        fs.unlinkSync('./uploads/'+result.image)
      } catch (error) {
        console.log(error);
      }
    }
    res.status(200).json({message: 'Product deleted successfully!'})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
  
};
