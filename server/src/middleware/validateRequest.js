const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const firstError = errors.array()[0];
  return errorResponse(
    res,
    'Validation failed',
    400,
    'VALIDATION_ERROR',
    [{ field: firstError.path || 'field', message: firstError.msg }]
  );
};

module.exports = validateRequest;
