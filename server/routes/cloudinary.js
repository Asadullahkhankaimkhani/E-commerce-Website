const express = require("express");

const router = express.Router();
// controllers
const { upload, remove } = require("../controllers/cloudinary");
// middleware
const { authCheck, adminCheck } = require("../middleware/auth");
router.post("/uploadImages", authCheck, adminCheck, upload);
router.post("/removeImage", authCheck, adminCheck, remove);

module.exports = router;
