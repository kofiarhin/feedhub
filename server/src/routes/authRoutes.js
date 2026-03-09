const express = require('express');
const controller = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidators');
const validateRequest = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerValidator, validateRequest, controller.register);
router.post('/login', loginValidator, validateRequest, controller.login);
router.post('/logout', controller.logout);
router.get('/me', protect, controller.getMe);

module.exports = router;
