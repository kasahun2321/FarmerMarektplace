const User = require("../model/users.js");
const Order = require("../model/orders");

// @desc      Add item to the cart
// @route     Post /cart
// @access    Public

exports.addToCart = async (req, res, next) => {
  try {
    await User.updateOne(
      { _id: "5f0417ceaec98ec6367e5f2c" },
      {
        $push: {
          "customerInfo.cart": {
            productId: "5f040a6b296ab5b247755855",
          },
        },
      }
    );
    res.status(200).json({ success: true, data: "created" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Get  cart list
// @route     GET /carts
// @access    Public

exports.getUserCart = async (req, res, next) => {
  try {
    let user = await User.findById("5f0417ceaec98ec6367e5f2c");
    let cartList = await user
      .populate("customerInfo.cart.productId")
      .execPopulate();
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Place order for user
// @route     Post /orders
// @access    Private

exports.placeOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      customer: "5f0417ceaec98ec6367e5f2c",
      farmer: "5f03f8e2c3b2d99ffec3a81c",
      products: ["product1", "product2"],
    });
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc      Get order history
// @route     Get /orders
// @access    Private

exports.orderHistory = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: "5f0417ceaec98ec6367e5f2c" });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};