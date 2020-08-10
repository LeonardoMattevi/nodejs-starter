const { createLogger, transports, format } = require('winston');

const transportErrors = [
  new transports.File({
    level: 'error',
    filename: 'logs/winston/mid-errors.log',
    maxsize: 30000000, // 30MB
    tailable: true,
    maxFiles: 3,
  }),
];
const loggerError = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss:ms' }),
    format.printf(err => { return `${JSON.stringify(err)},`; }),
  ),
  transports: transportErrors,
});

module.exports = {
  errorMidLogger(err, req, res, next) {
    loggerError.error(err.message, {
      date: new Date().toLocaleString(),
      statusCode: err.statusCode || '500',
      url: req.url || '',
      stack: err.stack,
    });
    res.status(err.statusCode || 500).send(err.message || err);
    next();
  },
};
