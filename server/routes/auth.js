const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

router.get("/create-or-update-user", (req, res) => {
  res.json({
    data: "User create and update Api",
  });
});

module.exports = router;
