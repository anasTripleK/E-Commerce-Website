const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  totalBill: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  shippingDetails: {
    blockNumber: {
      type: String,
    },
    houseNo: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
  },
  riderOrShippingNote: {
    type: String,
  },
  orderStatus: {
    type: String,
    default: 'Initiated',
  },
  products: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
        },
        quantity: {
          type: Number,
        },
      },
    ],
    required: true,
  },
});

module.exports = Order = mongoose.model('order', orderSchema);
