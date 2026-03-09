const express = require('express');
const { requireAuth } = require('@clerk/express');
const { syncUser, me, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/sync', requireAuth(), syncUser);
router.get('/me', requireAuth(), me);
router.post('/logout', logout);

module.exports = router;
