const { sendError } = require('../utils/apiResponse');

const failValidation = (res, field, message) =>
  sendError(res, 'Validation failed', 400, 'VALIDATION_ERROR', [{ field, message }]);

module.exports = { failValidation };
