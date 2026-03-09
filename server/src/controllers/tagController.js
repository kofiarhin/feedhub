const MENU_TAGS = require('../constants/menuTags');
const { successResponse } = require('../utils/response');

const getTags = (_req, res) => successResponse(res, MENU_TAGS, 'Tags fetched');

module.exports = { getTags };
