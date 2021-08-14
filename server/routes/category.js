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
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/sub/:_id",  getSubs);

module.exports = router;
