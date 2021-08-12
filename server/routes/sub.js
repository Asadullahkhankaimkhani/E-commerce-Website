const express = require("express");

const router = express.Router();
// controllers
const { create, list, read, remove, update } = require("../controllers/sub");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/sub", authCheck, adminCheck, create);
router.get("/subs", list);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authCheck, adminCheck, update);
router.delete("/sub/:slug", authCheck, adminCheck, remove);

module.exports = router;
