const express = require('express');
const { requireAuth } = require('@clerk/express');
const { requireRole } = require('../middleware/requireRole');
const { createMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability } = require('../controllers/menuController');

const router = express.Router();

router.post('/', requireAuth(), requireRole('admin'), createMenuItem);
router.put('/:id', requireAuth(), requireRole('admin'), updateMenuItem);
router.delete('/:id', requireAuth(), requireRole('admin'), deleteMenuItem);
router.patch('/:id/toggle-availability', requireAuth(), requireRole('admin'), toggleAvailability);

module.exports = router;
