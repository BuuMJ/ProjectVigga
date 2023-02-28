const express = require('express');
const router = express.Router();
const { checkLogin, checkStaff, checkCoordinator, checkManager, checkAdmin, dataIdea } = require('../util/authonize')
const staffsubmissionController = require('../app/controllers/StaffsubmissionController');

// communityController.index

router.get('/:id', staffsubmissionController.show);
router.get('/idea/createIdea', staffsubmissionController.createIdea);
router.post('/idea/storeIdea', staffsubmissionController.storeIdea);
router.get('/idea/:id', staffsubmissionController.detail);
router.get('/', staffsubmissionController.index);

module.exports = router;