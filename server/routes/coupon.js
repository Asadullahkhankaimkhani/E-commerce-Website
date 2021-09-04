const express = require("express");

const router = express.Router();
// controllers
const { create, remove, list } = require("../controllers/coupon");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.delete("/coupon/:id", remove);

module.exports = router;
