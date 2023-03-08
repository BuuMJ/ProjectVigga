const express = require("express");
const router = express.Router();
const registerController = require("../app/controllers/RegisterController");
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
} = require("../util/authonize");

//createuser
router.post("/apiregister", registerController.apiregister);
router.get("/", registerController.register);
module.exports = router;
