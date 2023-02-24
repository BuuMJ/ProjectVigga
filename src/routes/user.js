const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const { checkLogin, checkStaff, checkCoordinator, checkManager, checkAdmin } = require('../util/authonize')

router.post('/comment', userController.comment)
router.get('/', userController.index)
router.get('/:id/editUser', userController.editUser)


module.exports = router;