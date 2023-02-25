const express = require("express");
const router = express.Router();
const staticController = require("../app/controllers/StaticController");

//[GET]
router.get("/", staticController.index);

module.exports = router;
