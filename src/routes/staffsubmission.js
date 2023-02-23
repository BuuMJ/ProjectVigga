const express = require('express');
const router = express.Router();
const { checkLogin, checkStaff, checkCoordinator, checkManager, checkAdmin } = require('../ulti/authonize')
const staffsubmissionController = require('../app/controllers/StaffsubmissionController');

// communityController.index

router.get('/', checkLogin, checkStaff, staffsubmissionController.index);

module.exports = router;