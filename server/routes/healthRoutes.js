const express = require('express');
const { sendSuccess } = require('../utils/apiResponse');

const router = express.Router();
router.get('/', (req, res) => sendSuccess(res, { status: 'healthy' }));

module.exports = router;
