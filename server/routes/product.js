const express = require("express");

const router = express.Router();
// controllers
const { create, listAll } = require("../controllers/product");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
module.exports = router;
