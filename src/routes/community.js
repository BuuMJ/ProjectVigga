const express = require('express');
const router = express.Router();

const communityController = require('../app/controllers/CommunityController');

// communityController.index

router.use('/', communityController.index);

module.exports = router;