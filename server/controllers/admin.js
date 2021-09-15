const Order = require("../models/order");

// orders function
exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
};
// Order status Function
exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findOneAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};
