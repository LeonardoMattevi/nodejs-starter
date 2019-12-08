const { createLogger, transports, format } = require('winston');

const transportErrors = [
    new transports.File({
        level: 'error',
        filename: 'logs/winston/errors.log',
        maxsize: 30000000, // 30MB
        tailable: true,
        maxFiles:3
    })
];
const transportInfo = [
    new transports.File({
        level: 'info',
        filename: 'logs/winston/info.log',
        maxsize: 30000000, // 30MB
        tailable: true,
        maxFiles:3
    })
];
const loggerError = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss:ms' }),
        format.printf(err => { return `${JSON.stringify(err)},`; })
    ),
    transports: transportErrors
});
const loggerInfo = createLogger({
    format: format.combine(
        format.printf(info => { return info.message + info.date; })
    ),
    transports: transportInfo
});
module.exports = {
    infoLogger (message) {
        loggerInfo.info(message, {      
            date: new Date().toLocaleString()
        });
    },
    errorLogger (err, req, res, next) {
        loggerError.error(err.message, {
            date: new Date().toLocaleString(),
            statusCode: err.statusCode || "500",
            url: req.url || "",
            stack: err.stack
        });    
        res.status(err.statusCode || 500).send(err.message || err);
        next();
    }
}