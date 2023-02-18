
const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/createuser', userController.create)
router.get('/' , userController.index)
module.exports = router;