const Order = require('../models/Order');

exports.addOrder = async (req, res) => {
  try {
    const order = {};
    order.user = req.user.id;
    order.totalBill = req.body.totalBill;
    order.name = req.body.name;
    if (req.body.riderOrShippingNote) {
      order.riderOrShippingNote = req.body.riderOrShippingNote;
    }
    order.shippingDetails = {};
    if (req.body.blockNumber) {
      order.shippingDetails.blockNumber = req.body.blockNumber;
    }
    order.shippingDetails.houseNo = req.body.houseNo;
    order.shippingDetails.area = req.body.area;
    order.shippingDetails.city = req.body.city;
    order.shippingDetails.province = req.body.province;
    order.shippingDetails.mobileNo = req.body.mobileNo;
    order.products = [...req.body.productsOrdered];
    console.log(order);
    const newOrder = new Order(order);
    await newOrder.save();
    res.json({ msg: 'Order has been placed', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Server error' });
  }
};

exports.getOrdersOfUser = async (req, res) => {
  try {
    const id = req.user.id;
    const orders = await Order.find()
      .where('user', id)
      .populate('products.productId', 'title price')
      .select('-shippingDetails -user -rideOrShippingNote');
    console.log(orders.length);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('products.productId', 'title price')
      .select('-shippingDetails -user -rideOrShippingNote');
    console.log(orders.length);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Server error' });
  }
};

exports.changeToDeliveredStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    console.log(req.params.id);
    order.orderStatus = 'Delivered';
    console.log(order);
    await order.save();
    res.json({ msg: 'order status changed to delivered' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Server error' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    await Order.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Order cancelled' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Server error' });
  }
};
