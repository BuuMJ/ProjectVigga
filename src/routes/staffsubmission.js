const express = require('express');
const router = express.Router();

const staffsubmissionController = require('../app/controllers/StaffsubmissionController');

// communityController.index

router.get('/', staffsubmissionController.index);

module.exports = router;