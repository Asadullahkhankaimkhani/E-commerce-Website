const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
// controllers
const { createOrUpadateUser, currentUser } = require("../controllers/auth");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/create-or-update-user", authCheck, createOrUpadateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
module.exports = router;
