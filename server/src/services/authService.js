const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Store = require("../models/Store");
const ApiError = require("../utils/ApiError");
const sanitizeUser = require("../utils/sanitizeUser");
const { signToken } = require("../utils/jwt");

const attachStoreIdIfAdmin = async (user) => {
  if (user.role !== "admin") {
    return sanitizeUser(user);
  }

  const store = await Store.findOne({ adminId: user._id }).select("_id");

  return sanitizeUser(user, {
    storeId: store?._id || null,
  });
};

const registerUser = async (payload) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new ApiError(409, "Email already registered", "DUPLICATE_KEY");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({ ...payload, password: hashedPassword });

  return {
    token: signToken({ userId: user._id, role: user.role }),
    user: await attachStoreIdIfAdmin(user),
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials", "INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials", "INVALID_CREDENTIALS");
  }

  return {
    token: signToken({ userId: user._id, role: user.role }),
    user: await attachStoreIdIfAdmin(user),
  };
};

module.exports = { registerUser, loginUser, attachStoreIdIfAdmin };
