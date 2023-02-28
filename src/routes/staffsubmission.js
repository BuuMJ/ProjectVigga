const express = require('express');
const router = express.Router();
const { checkLogin, checkStaff, checkCoordinator, checkManager, checkAdmin, dataIdea } = require('../util/authonize')
const staffsubmissionController = require('../app/controllers/StaffsubmissionController');

// communityController.index

router.get('/', checkLogin, checkStaff, staffsubmissionController.index);
router.get('/:id', staffsubmissionController.show);

module.exports = router;