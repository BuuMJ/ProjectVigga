const express = require('express');
const router = express.Router();
const { checkLogin, checkStaff, checkCoordinator, checkManager, checkAdmin, dataIdea } = require('../util/authonize')
const staffsubmissionController = require('../app/controllers/StaffsubmissionController');

// communityController.index
router.get('/:id', staffsubmissionController.show)
router.post('/:id/like', dataIdea, staffsubmissionController.like)
router.post('/:id/dislike', dataIdea, staffsubmissionController.dislike)

router.get('/idea/createIdea',staffsubmissionController.createIdea)
router.post('/idea/storeIdea',staffsubmissionController.storeIdea)

router.get('/idea/:id', staffsubmissionController.detail)
router.post('/idea/:id/view', dataIdea,staffsubmissionController.view)
router.post('/idea/:id/comment', dataIdea,staffsubmissionController.comment)
router.get('/', staffsubmissionController.index)



module.exports = router;