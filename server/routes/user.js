const express = require("express");
const router = express.Router();

const { authCheck } = require("../middleware/auth");
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

//
router.post("/user/order", authCheck, createOrder);
router.get("/user/order", authCheck, orders);

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// router.get("/user", (req, res) => {
//   res.json({ name: "Asadullah Khan" });
// });

module.exports = router;
