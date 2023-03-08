const express = require("express");
const router = express.Router();
const statisticsController = require("../app/controllers/StatisticsController");
const { dataStatistics } = require("../util/data");
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
  dataDepartment,
  dataIdea,
  dataCategory,
} = require("../util/authonize");

//[GET]
router.get("/", dataStatistics, statisticsController.statistic);

module.exports = router;
