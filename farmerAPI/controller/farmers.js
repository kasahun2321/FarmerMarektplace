const User = require("../model/users.js");
const Product = require("../model/products");
const Order = require("../model/orders");

// @desc    Create Product
// @route   Post /api/v1/farmermarket/farmers/products
// @access  Private

exports.addProduct = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    await User.updateOne(
      { _id: "5f03f8e2c3b2d99ffec3a81c" },
      { $push: { "farmerInfo.products": product._id } }
    );
    res.status(200).json({ success: true, data: "created" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Get customers orders
// @route     Get /api/v1/farmermarket/farmers/orders
// @access    Private

exports.checkOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: "5f03f8e2c3b2d99ffec3a81c" });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
// @desc      Post update order status pending =>r eady => complete
// @route     Post /api/v1/farmermarket/farmers/orders/:order_number
// @access    Private

exports.updateOrder = async (req, res) => {
  try {
    const orders = await Order.updateOne(
      { _id: "5f04aaf8ca8f9d34091353ce" },
      { $set: { status: "ready" } }
    );
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
