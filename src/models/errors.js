class HttpError extends Error {
  constructor(error, statusCode) {
    super(typeof (error) === 'string' ? error : error.message);
    this.statusCode = statusCode || 500;
  }
}

module.exports = {
  HttpError,
};
