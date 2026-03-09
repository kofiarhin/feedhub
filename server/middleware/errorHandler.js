const { sendError } = require('../utils/apiResponse');

const notFoundHandler = (req, res) => sendError(res, 'Route not found', 404, 'NOT_FOUND');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  return sendError(res, err.message || 'Internal server error', status, err.code || 'SERVER_ERROR');
};

module.exports = { errorHandler, notFoundHandler };
