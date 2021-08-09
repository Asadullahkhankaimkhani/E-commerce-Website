const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
// controllers
const { createOrUpadateUser } = require("../controllers/auth");
// middleware
const { authCheck } = require("../middleware/auth");
router.post("/create-or-update-user", authCheck, createOrUpadateUser);

module.exports = router;
