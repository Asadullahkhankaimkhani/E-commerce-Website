const express = require("express");

const router = express.Router();
// controllers
const { create, listAll, remove } = require("../controllers/product");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, remove);
module.exports = router;
