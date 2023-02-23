
const express = require('express');
const router = express.Router();
const managementsController = require('../app/controllers/ManagementsController');
const { checkLogin, checkStaff, checkCoordinator, checkManager, checkAdmin } = require('../ulti/authonize')

router.get('/category' , managementsController.category)
router.get('/submission' , managementsController.submission)
router.get('/department' , managementsController.department)


module.exports = router;