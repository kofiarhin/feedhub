const { getAuth } = require('@clerk/express');
const User = require('../models/User');

const loadUser = async (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) return next();
  req.user = await User.findOne({ clerkId: userId });
  return next();
};

module.exports = { loadUser };
