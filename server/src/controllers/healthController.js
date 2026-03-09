const { successResponse } = require('../utils/response');

const healthCheck = (_req, res) => successResponse(res, { status: 'healthy' }, 'Service healthy');

module.exports = { healthCheck };
