const successResponse = (res, data = null, message = 'OK', statusCode = 200, meta) => {
  const payload = { success: true, data, message };
  if (meta) payload.meta = meta;
  return res.status(statusCode).json(payload);
};

const errorResponse = (res, message, statusCode = 500, code = 'INTERNAL_SERVER_ERROR', errors = []) =>
  res.status(statusCode).json({ success: false, message, code, errors });

module.exports = { successResponse, errorResponse };
