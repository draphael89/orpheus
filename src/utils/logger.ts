type LogMessage = string | number | boolean | null | undefined | object;

export class Logger {
  static debug(message: LogMessage, ...args: LogMessage[]): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(message, ...args);
    }
  }

  static info(message: LogMessage, ...args: LogMessage[]): void {
    console.info(message, ...args);
  }

  static warn(message: LogMessage, ...args: LogMessage[]): void {
    console.warn(message, ...args);
  }

  static error(message: LogMessage, error?: unknown, ...args: LogMessage[]): void {
    console.error(message, error, ...args);
  }
} 