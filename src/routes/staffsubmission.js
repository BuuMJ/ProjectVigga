const express = require("express");
const router = express.Router();
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
  dataIdea,
} = require("../util/authonize");
const staffsubmissionController = require("../app/controllers/StaffsubmissionController");
const { dataStatistics, upload } = require("../util/data");
const multer = require("multer");

// communityController.index
router.get("/:id", staffsubmissionController.show);
router.post("/:id/like", dataIdea, staffsubmissionController.like);
router.post("/:id/dislike", dataIdea, staffsubmissionController.dislike);

router.get("/idea/createIdea", staffsubmissionController.createIdea);
router.post(
  "/idea/storeIdea",
  upload.single("file"),
  staffsubmissionController.storeIdea
);

router.get("/:id/exportIdea", staffsubmissionController.exportIdea);
router.get("/:id/exportZip.zip", staffsubmissionController.exportZip);

router.post("/idea/:id/view", dataIdea, staffsubmissionController.view);
router.post("/idea/:id/comment", dataIdea, staffsubmissionController.comment);
router.get("/", staffsubmissionController.index);
module.exports = router;
