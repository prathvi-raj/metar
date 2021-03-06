import * as winston from "winston";

/**
 * //TODO: change logger configuration to configuration file
 */
const options: winston.LoggerOptions = {
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.simple()
      ),

    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" })
    ]
};

export const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}