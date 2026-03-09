const express = require('express');
const { requireAuth } = require('@clerk/express');
const { requireRole } = require('../middleware/requireRole');
const { getStores, getStore, createStore, updateStore, getStoreMenu } = require('../controllers/storeController');

const router = express.Router();

router.get('/', getStores);
router.get('/:id', getStore);
router.get('/:id/menu', getStoreMenu);
router.post('/', requireAuth(), requireRole('admin'), createStore);
router.put('/:id', requireAuth(), requireRole('admin'), updateStore);

module.exports = router;
