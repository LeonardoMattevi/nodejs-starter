const { createLogger, transports, format } = require('winston');

const transportError = [
  new transports.File({
    level: 'info',
    filename: 'logs/winston/errors.log',
    maxsize: 30000000, // 30MB
    tailable: true,
    maxFiles: 3,
  }),
  new transports.Console({
    format: format.simple(),
  }),
];
const transportInfo = [
  new transports.File({
    level: 'info',
    filename: 'logs/winston/info.log',
    maxsize: 30000000, // 30MB
    tailable: true,
    maxFiles: 3,
  }),
  new transports.Console({
    format: format.simple(),
  }),
];
const loggerError = createLogger({
  format: format.combine(
    format.printf(err => err.message),
  ),
  transports: transportError,
});
const loggerInfo = createLogger({
  format: format.combine(
    format.printf(info => info.message),
  ),
  transports: transportInfo,
});

module.exports = {
  logger: {
    info(message) {
      loggerInfo.info(message + ' | ' + new Date().toISOString());
    },
    error(err, url) {
      loggerError.error(err.message, {
        date: new Date().toLocaleString(),
        statusCode: err.statusCode || '500',
        url: url || '',
        stack: err.stack,
      });
    },
  },
};
