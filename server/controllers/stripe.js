const User = require("../models/users");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calculate price

  // find user
  const user = await User.findOne({ enail: req.user.enail }).exec();
  // get user cart total
  const { cartTotal } = await Cart.findOne({ orderdBy: user._id }).exec();
  console.log(cartTotal);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: cartTotal * 100,
    currency: "usd",
  });
  console.log();

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
