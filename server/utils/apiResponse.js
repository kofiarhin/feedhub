const sendSuccess = (res, data, message = 'OK', status = 200, meta) => {
  const payload = { success: true, data, message };
  if (meta) payload.meta = meta;
  return res.status(status).json(payload);
};

const sendError = (res, message, status = 400, code = 'BAD_REQUEST', errors) => {
  const payload = { success: false, message, code };
  if (errors) payload.errors = errors;
  return res.status(status).json(payload);
};

module.exports = { sendSuccess, sendError };
