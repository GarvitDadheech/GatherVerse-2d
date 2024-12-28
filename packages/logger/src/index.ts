import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "cyan",
};

winston.addColors(colors);

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf((info) => {
    const colorizer = winston.format
      .colorize()
      .colorize.bind(winston.format.colorize());
    return colorizer(
      info.level,
      `--${info.level.toUpperCase()}-- ${info.timestamp} ${info.message}`
    );
  })
);

class Logger {
  private static instance: Logger;
  private logger: winston.Logger;

  private constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || "info",
      levels,
      format: logFormat,
      transports: [new winston.transports.Console()],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public error(message: string, meta: object = {}): void {
    this.logger.error(this.formatMessage(message, meta));
  }

  public warn(message: string, meta: object = {}): void {
    this.logger.warn(this.formatMessage(message, meta));
  }

  public info(message: string, meta: object = {}): void {
    this.logger.info(this.formatMessage(message, meta));
  }

  public http(message: string, meta: object = {}): void {
    this.logger.http(this.formatMessage(message, meta));
  }

  public debug(message: string, meta: object = {}): void {
    this.logger.debug(this.formatMessage(message, meta));
  }

  private formatMessage(message: string, meta: object): string {
    return Object.keys(meta).length
      ? `${message} ${JSON.stringify(meta)}`
      : message;
  }
}

export default Logger.getInstance() as Logger;
