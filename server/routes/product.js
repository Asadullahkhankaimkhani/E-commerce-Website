const express = require("express");

const router = express.Router();
// controllers
const { create } = require("../controllers/product");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/product", authCheck, adminCheck, create);

module.exports = router;
