const ApiError = require('../utils/ApiError');

const authorizeRoles = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new ApiError(401, 'Unauthorized', 'UNAUTHORIZED'));
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Forbidden', 'FORBIDDEN'));
  }
  return next();
};

module.exports = authorizeRoles;
