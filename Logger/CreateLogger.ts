import { format } from "winston";
import winston from "winston";
import { Logger } from "winston"

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// };
let logger: Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: './log/error.log',
            level: 'error',
            format: format.combine(
                format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
                format.printf(info => `${info.level} ${info.timestamp} ${info.message}`)
            )
        }),
        new winston.transports.Console()
    ]
})

const stream = {
    write: (message: string) => {
        logger.error(message);
        logger.log("warn", message)
    }
}

export { logger, stream }