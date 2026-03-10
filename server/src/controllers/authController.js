const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");
const {
  registerUser,
  loginUser,
  attachStoreIdIfAdmin,
} = require("../services/authService");

const register = asyncHandler(async (req, res) => {
  const data = await registerUser(req.body);
  return successResponse(res, data, "User registered successfully", 201);
});

const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);
  return successResponse(res, data, "Login successful");
});

const logout = asyncHandler(async (_req, res) =>
  successResponse(res, null, "Logout successful"),
);

const getMe = asyncHandler(async (req, res) => {
  const user = await attachStoreIdIfAdmin(req.user);
  return successResponse(res, user, "Current user fetched");
});

module.exports = { register, login, logout, getMe };
