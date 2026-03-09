const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../utils/jwt');

const readToken = (req) => {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
};

const protect = async (req, res, next) => {
  const token = readToken(req);
  if (!token) return next(new ApiError(401, 'Unauthorized', 'UNAUTHORIZED'));

  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.userId).select('-password');
    if (!user) return next(new ApiError(401, 'User not found', 'UNAUTHORIZED'));
    req.user = user;
    return next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid token', 'UNAUTHORIZED'));
  }
};

const optionalAuth = async (req, _res, next) => {
  const token = readToken(req);
  if (!token) return next();

  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.userId).select('-password');
    if (user) req.user = user;
  } catch (_error) {
    req.user = null;
  }

  return next();
};

module.exports = { protect, optionalAuth };
