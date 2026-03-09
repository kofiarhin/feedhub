const express = require('express');
const controller = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { createMenuValidator, updateMenuValidator, idValidator } = require('../validators/menuValidators');
const ROLES = require('../constants/roles');

const router = express.Router();

router.post('/', protect, authorizeRoles(ROLES.ADMIN), createMenuValidator, validateRequest, controller.createMenuItem);
router.put('/:id', protect, authorizeRoles(ROLES.ADMIN), updateMenuValidator, validateRequest, controller.updateMenuItem);
router.delete('/:id', protect, authorizeRoles(ROLES.ADMIN), idValidator, validateRequest, controller.deleteMenuItem);
router.patch('/:id/toggle-availability', protect, authorizeRoles(ROLES.ADMIN), idValidator, validateRequest, controller.toggleAvailability);

module.exports = router;
