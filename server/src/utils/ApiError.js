class ApiError extends Error {
  constructor(statusCode, message, code = 'API_ERROR', errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
  }
}

module.exports = ApiError;
