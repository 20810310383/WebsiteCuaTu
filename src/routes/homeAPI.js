const express = require('express');
const router = express.Router();
const { postCreateSP } = require("../controllers/TrangChu/homeAPIController");
//-----------------------------------------

router.post("/create", postCreateSP)

module.exports = router;