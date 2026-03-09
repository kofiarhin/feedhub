const express = require('express');
const controller = require('../controllers/storeController');
const { protect } = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { createStoreValidator, updateStoreValidator, listStoresValidator } = require('../validators/storeValidators');
const ROLES = require('../constants/roles');

const router = express.Router();

router.get('/', listStoresValidator, validateRequest, controller.listStores);
router.get('/:id', controller.getStore);
router.get('/:id/menu', controller.getStoreMenu);
router.post('/', protect, authorizeRoles(ROLES.ADMIN), createStoreValidator, validateRequest, controller.createStore);
router.put('/:id', protect, authorizeRoles(ROLES.ADMIN), updateStoreValidator, validateRequest, controller.updateStore);

module.exports = router;
