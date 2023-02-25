const express = require("express");
const router = express.Router();
const staticsController = require("../app/controllers/StaticsController");

//[GET]
router.get("/", staticsController.index);

module.exports = router;
