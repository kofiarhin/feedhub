const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/response');
const { registerCustomer, registerPartner, loginUser, getCurrentUser } = require('../services/authService');
const ROLES = require('../constants/roles');

const customerRegister = asyncHandler(async (req, res) => {
  const data = await registerCustomer(req.body);
  return successResponse(res, data, 'Customer registered successfully', 201);
});

const customerLogin = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body, ROLES.CUSTOMER);
  return successResponse(res, data, 'Customer login successful');
});

const partnerRegister = asyncHandler(async (req, res) => {
  const data = await registerPartner(req.body);
  return successResponse(res, data, 'Partner registered successfully', 201);
});

const partnerLogin = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body, ROLES.ADMIN);
  return successResponse(res, data, 'Partner login successful');
});

const logout = asyncHandler(async (_req, res) => successResponse(res, null, 'Logout successful'));

const getMe = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user);
  return successResponse(res, user, 'Current user fetched');
});

module.exports = {
  customerRegister,
  customerLogin,
  partnerRegister,
  partnerLogin,
  logout,
  getMe
};
