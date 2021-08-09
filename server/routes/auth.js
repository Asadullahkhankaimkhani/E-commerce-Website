const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

const { createOrUpadateUser } = require("../controllers/auth");

router.get("/create-or-update-user", createOrUpadateUser);

module.exports = router;
