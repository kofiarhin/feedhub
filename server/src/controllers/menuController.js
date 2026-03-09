const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/response');
const menuService = require('../services/menuService');

const createMenuItem = asyncHandler(async (req, res) => {
  const item = await menuService.createMenuItem(req.body, req.user._id);
  return successResponse(res, item, 'Menu item created', 201);
});

const updateMenuItem = asyncHandler(async (req, res) => {
  const item = await menuService.updateMenuItem(req.params.id, req.body, req.user._id);
  return successResponse(res, item, 'Menu item updated');
});

const deleteMenuItem = asyncHandler(async (req, res) => {
  await menuService.deleteMenuItem(req.params.id, req.user._id);
  return successResponse(res, null, 'Menu item deleted');
});

const toggleAvailability = asyncHandler(async (req, res) => {
  const item = await menuService.toggleMenuAvailability(req.params.id, req.user._id);
  return successResponse(res, item, 'Menu availability toggled');
});

module.exports = { createMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability };
