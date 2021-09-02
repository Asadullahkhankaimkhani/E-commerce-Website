const express = require("express");
const router = express.Router();

const { authCheck } = require("../middleware/auth");
const { userCart } = require("../controllers/user");

router.post("/cart", authCheck, userCart);

// router.get("/user", (req, res) => {
//   res.json({ name: "Asadullah Khan" });
// });

module.exports = router;
