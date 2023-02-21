
const express = require('express');
const router = express.Router();
const assigmentsController = require('../app/controllers/AssigmentsController');

router.get('/createAssigments', assigmentsController.createAssigments)
router.get('/' , assigmentsController.index)

module.exports = router;