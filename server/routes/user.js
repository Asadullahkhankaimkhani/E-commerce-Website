const express = require("express");
const { route } = require("./auth");
const router = express.Router();

router.get("/user", (req, res) => {
  res.json({ name: "Asadullah Khan" });
});

module.exports = router;
