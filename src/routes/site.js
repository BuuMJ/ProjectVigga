const express = require('express');
const router = express.Router();
const { checkLogin, checkStaff, checkCoordinator, checkManager, checkAdmin } = require('../util/authonize')
const siteController = require('../app/controllers/SiteController');



router.get('/login', siteController.login);
router.post('/apilogin', siteController.apilogin);
router.get('/', checkLogin, siteController.home);

module.exports = router;

