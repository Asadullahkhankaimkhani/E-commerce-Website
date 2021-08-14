const express = require("express");

const router = express.Router();
// controllers
const { create ,read} = require("../controllers/product");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/product", authCheck, adminCheck, create);
router.get("/products",read);
module.exports = router;
