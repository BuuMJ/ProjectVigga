const express = require("express");
const router = express.Router();
const statisticsController = require("../app/controllers/StatisticsController");

//[GET]
router.get("/", statisticsController.index);

module.exports = router;
