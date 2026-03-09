const { clerkClient, getAuth } = require('@clerk/express');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const syncUser = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return sendError(res, 'Unauthorized', 401, 'UNAUTHORIZED');

    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.emailAddresses?.[0]?.emailAddress;
    if (!email) return sendError(res, 'Missing email in identity provider', 400, 'MISSING_EMAIL');

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        clerkId: userId,
        email,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || 'FeedHub User'
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return sendSuccess(res, user, 'User synced');
  } catch (error) {
    return next(error);
  }
};

const me = async (req, res) => {
  if (!req.user) return sendError(res, 'User not found', 404, 'NOT_FOUND');
  return sendSuccess(res, req.user);
};

const logout = async (req, res) => sendSuccess(res, { loggedOut: true }, 'Logged out');

module.exports = { syncUser, me, logout };
