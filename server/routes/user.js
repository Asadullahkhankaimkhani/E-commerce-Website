const express = require("express");
const router = express.Router();

const { authCheck } = require("../middleware/auth");
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);
// router.get("/user", (req, res) => {
//   res.json({ name: "Asadullah Khan" });
// });

module.exports = router;
