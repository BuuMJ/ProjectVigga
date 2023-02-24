const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const { checkLogin, checkStaff, checkCoordinator, checkManager, checkAdmin } = require('../util/authonize')

router.post('/comment', userController.comment)
router.get('/', userController.index)

module.exports = router;