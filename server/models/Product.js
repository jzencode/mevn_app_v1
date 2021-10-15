const { Schema, model } = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose')


mongoose.plugin(slug);

const productsSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
      slug_padding_size: 4,
    },
    category: String,
    brand: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    qty: {
      type: Number,
      required: true,
      min: 0,
    },
    status: String,
    discountPerc: {
      type: Number,
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    total: {
      type: Number,
      min: 0,
    },
    netPrice: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Product', productsSchema);

