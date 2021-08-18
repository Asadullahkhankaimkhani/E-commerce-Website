const express = require("express");

const router = express.Router();
// controllers
const { create, listAll, remove, read } = require("../controllers/product");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
module.exports = router;
