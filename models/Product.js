const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  completeDescription: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  specs: {
    cableLength: {
      type: Number,
      default: null,
    },
    connecterType: {
      type: String,
      default: null,
    },
    dimension: {
      type: String,
      default: null,
    },
    storageCapacity: {
      type: Number,
      default: null,
    },
    touch: {
      type: Boolean,
      default: null,
    },
    wireless: {
      type: Boolean,
      default: null,
    },
    material: {
      type: String,
      default: null,
    },
    additionalSpecs1: {
      type: String,
      default: null,
    },
    additionalSpecs2: {
      type: String,
      default: null,
    },
  },
});

module.exports = Product = mongoose.model('product', productSchema);
