
const express = require('express');
const router = express.Router();
const managementsController = require('../app/controllers/ManagementsController');

// Category
router.get('/category' , managementsController.category)
router.get('/create', managementsController.create)
router.post('/store', managementsController.store)
router.get('/:id/edit', managementsController.edit)
router.put('/:id', managementsController.update)
router.delete('/:id', managementsController.delete)


router.get('/submission' , managementsController.submission)

router.get('/department' , managementsController.department)


module.exports = router;