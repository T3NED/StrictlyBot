import { Logger as NedBotLogger } from "@nedbot/logger";

export const DatabaseLog = new NedBotLogger({
  source: "Database",
  logFilesDirectory: "logs/database",
  mainLogFileName: "database.log",
  errorLogFileName: "database-errors.log",
  timestampFormat: "DD/MM/YYYY @ HH:mm:ss",
  fileDateFormat: "DD-MM-HH-YYYY",
  enableConsoleLogs: true,
  enableMainLogFile: true,
  enableErrorLogFile: true,
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
});

export const RedisLog = new NedBotLogger({
  source: "Redis",
  logFilesDirectory: "logs/redis",
  mainLogFileName: "redis.log",
  errorLogFileName: "redis-errors.log",
  timestampFormat: "DD/MM/YYYY @ HH:mm:ss",
  fileDateFormat: "DD-MM-HH-YYYY",
  enableConsoleLogs: true,
  enableMainLogFile: true,
  enableErrorLogFile: true,
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
});

export const Logger = new NedBotLogger({
  logFilesDirectory: "logs",
  mainLogFileName: "main.log",
  errorLogFileName: "errors.log",
  timestampFormat: "DD/MM/YYYY @ HH:mm:ss",
  fileDateFormat: "DD-MM-HH-YYYY",
  enableConsoleLogs: true,
  enableMainLogFile: true,
  enableErrorLogFile: true,
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
});
