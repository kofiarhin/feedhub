const { errorResponse } = require('../utils/response');

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;

  if (err.name === 'ValidationError') {
    const firstField = Object.keys(err.errors)[0];
    return errorResponse(res, 'Validation failed', 400, 'VALIDATION_ERROR', [
      { field: firstField, message: err.errors[firstField].message }
    ]);
  }

  if (err.code === 11000) {
    const firstField = Object.keys(err.keyValue)[0];
    return errorResponse(res, `${firstField} already exists`, 409, 'DUPLICATE_KEY', [
      { field: firstField, message: `${firstField} already exists` }
    ]);
  }

  return errorResponse(
    res,
    err.message || 'Internal Server Error',
    statusCode,
    err.code || 'INTERNAL_SERVER_ERROR',
    err.errors || []
  );
};

module.exports = errorHandler;
