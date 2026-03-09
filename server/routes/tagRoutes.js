const express = require('express');
const { MENU_TAGS } = require('../constants/appConstants');
const { sendSuccess } = require('../utils/apiResponse');

const router = express.Router();
router.get('/', (req, res) => sendSuccess(res, MENU_TAGS));

module.exports = router;
