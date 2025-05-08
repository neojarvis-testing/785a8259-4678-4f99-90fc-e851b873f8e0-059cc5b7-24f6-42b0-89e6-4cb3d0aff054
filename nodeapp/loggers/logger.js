const { createLogger, format, transports } = require("winston")

const logger = createLogger ({
    level:'info',
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level} => ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename:'logs/info.log'}),
        new transports.File({filename: 'logs/error.log', level: 'error'})
    ]
})

module.exports = logger;