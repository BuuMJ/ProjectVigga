const express = require('express');
const router = express.Router();
const registerController = require('../app/controllers/RegisterController');


router.post('/apilogin', registerController.apiregister);
router.get('/', registerController.index);
module.exports = router;