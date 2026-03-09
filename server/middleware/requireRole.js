const { sendError } = require('../utils/apiResponse');

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return sendError(res, 'Forbidden', 403, 'FORBIDDEN');
  }
  return next();
};

module.exports = { requireRole };
