const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const {upload} = require('../util/data')
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
} = require("../util/authonize");

router.get("/", userController.index);
router.get("/:id/editUser", userController.editUser);
router.put("/:id", upload.single('avatar'), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
