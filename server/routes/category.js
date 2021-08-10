const express = require("express");

const router = express.Router();
// controllers
const {
  create,
  list,
  read,
  remove,
  update,
} = require("../controllers/category");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", authCheck, adminCheck, read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category", authCheck, adminCheck, remove);

module.exports = router;
