/** @format */

const User = require("../models/users");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const uniqueid = require("uniqueid");

exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  // console.log("new cart ----> ", newCart);
  res.json({ ok: true });
};
exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOne({ orderdBy: user._id }).exec();

  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const { email, address } = req.body;
  const userAddress = await User.findOneAndUpdate(
    { email },
    { address }
  ).exec();
  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  // console.log("Coupon", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();

  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }

  const user = await User.findOne({ email: req.user.email }).exec();

  let { prodouts, cartTotal } = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  // total After Discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeReponse;
  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();
  // decrement qunatity increment sold
  let bultOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // important item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  // products.blukwrite()
  let updated = await Product.bulkWrite(bultOption, {});
  console.log("product quantity and sold", updated);

  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();
  let userOrders = await Order.find({ orderdBy: user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};

// Wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
    { new: true }
  ).exec();
  res.json({ ok: true });
};

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

exports.createCashOrder = async (req, res) => {
  const { cod, couponApplied } = req.body;

  if (!cod) return res.status(400).send("Create cash order failed");

  // if cod is true , create order with status of cash on delivery
  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: "usd",
      status: "Cash on Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    orderdBy: user._id,
    orderStatus: "Cash On Delivery",
  }).save();
  // decrement qunatity increment sold
  let bultOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // important item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  // products.blukwrite()
  let updated = await Product.bulkWrite(bultOption, {});
  console.log("product quantity and sold", updated);

  res.json({ ok: true });
};
