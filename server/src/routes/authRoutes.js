const express = require('express');
const controller = require('../controllers/authController');
const { customerRegisterValidator, partnerRegisterValidator, loginValidator } = require('../validators/authValidators');
const validateRequest = require('../middleware/validateRequest');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/customer/register', customerRegisterValidator, validateRequest, controller.customerRegister);
router.post('/customer/login', loginValidator, validateRequest, controller.customerLogin);
router.post('/partner/register', partnerRegisterValidator, validateRequest, controller.partnerRegister);
router.post('/partner/login', loginValidator, validateRequest, controller.partnerLogin);
router.post('/logout', controller.logout);
router.get('/me', protect, controller.getMe);

module.exports = router;
