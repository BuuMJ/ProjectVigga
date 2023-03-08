const express = require("express");
const router = express.Router();
const managementsController = require("../app/controllers/ManagementsController");
const {
  checkLogin,
  checkStaff,
  checkCoordinator,
  checkManager,
  checkAdmin,
} = require("../util/authonize");

// Category
router.get("/category", managementsController.category);
router.get("/createCategory", managementsController.create);
router.post("/store", managementsController.store);
router.get("/:id/editCategory", managementsController.edit);
router.put("/:id", managementsController.update);
router.delete("/:id", managementsController.delete);

// Submission
router.get("/submission", checkManager, managementsController.submission);
router.get("/createSubmission", managementsController.createSubmission);
router.post("/storeSubmission", managementsController.storeSubmission);
router.get("/:id/editSubmission", managementsController.editSubmission);
router.put("/US/:id", managementsController.updateSubmission);
router.delete("/DS/:id", managementsController.deleteSubmission);

// department
router.get("/department", managementsController.department);
router.get("/createDepartment", managementsController.createDepartment);
router.post("/storeDepartment", managementsController.storeDepartment);
router.get("/:id/editDepartment", managementsController.editDepartment);
router.put("/UD/:id", managementsController.updateDepartment);
router.delete("/DD/:id", managementsController.deleteDepartment);

module.exports = router;
