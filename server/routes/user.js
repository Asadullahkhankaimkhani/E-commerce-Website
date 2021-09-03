const express = require("express");
const router = express.Router();

const { authCheck } = require("../middleware/auth");
const { userCart, getUserCart } = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);

router.get("/user/cart", authCheck, getUserCart);
// router.get("/user", (req, res) => {
//   res.json({ name: "Asadullah Khan" });
// });

module.exports = router;
