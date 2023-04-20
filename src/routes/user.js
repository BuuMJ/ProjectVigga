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

router.get("/profile", userController.editProfile);
router.put("/profile/update", upload.single('avatar'), userController.updateProfile);
router.get("/:id/editUser", checkAdmin, userController.editUser);
router.put("/:id", checkAdmin, upload.single('avatar'), userController.updateUser);
router.delete("/:id", checkAdmin, userController.deleteUser);
router.get("/", checkAdmin, userController.index);

module.exports = router;
