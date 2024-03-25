const Razorpay = require("razorpay");
const Expense = require("../models/expense");
const userController = require("./user");
exports.purchasePremium = async (req, res) => {
  try {
    let rzp = new Razorpay({
      key_id: process.env.RZP_ID,
      key_secret: process.env.RZP_KEY,
    });
    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        return res.status(404).json({
          error: "Error in razorpay",
        });
      }
      req.user.createOrder(order.id, "pending");
      res.status(201).json({
        order,
        key_id: rzp.key_id,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something Went Wrong !",
    });
  }
};
exports.updateTransactionStatus = async (req, res) => {
  try {
    let userId = req.user._id;
    const username = req.user.username;
    const orderid = req.body.orderid;
    const payment_id = req.body.payment_id;

    const order = await req.user.updateOrder(orderid, payment_id, "successful");
    return res.status(201).json({
      success: true,
      message: "Transaction Successful",
      token: userController.generateToken(userId, username, true),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something Went Wrong !",
    });
  }
};
