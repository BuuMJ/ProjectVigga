const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
} = require("../util/authonize");

router.get("/", userController.index);
router.get("/:id/editUser", userController.editUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
