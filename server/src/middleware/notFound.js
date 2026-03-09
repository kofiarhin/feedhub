const { errorResponse } = require('../utils/response');

const notFound = (req, res) => errorResponse(res, `Route not found: ${req.originalUrl}`, 404, 'NOT_FOUND');

module.exports = notFound;
