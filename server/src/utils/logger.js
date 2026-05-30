import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOGS_DIR = path.join(__dirname, "../../logs");

// Ensure the logs directory is present
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

/**
 * Core logging utility writing JSON lines to logs/app.log and console
 */
const writeLog = (level, message, meta = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };

  const logLine = JSON.stringify(logEntry) + "\n";

  // Asynchronously append to file to avoid blocking event loops
  fs.appendFile(path.join(LOGS_DIR, "app.log"), logLine, (err) => {
    if (err) {
      console.error("Failed to append to log file:", err);
    }
  });

  // Console fallback output
  if (level === "error") {
    console.error(`[${level.toUpperCase()}] ${message}`, Object.keys(meta).length ? meta : "");
  } else {
    console.log(`[${level.toUpperCase()}] ${message}`, Object.keys(meta).length ? meta : "");
  }
};

export const logger = {
  info: (message, meta) => writeLog("info", message, meta),
  error: (message, meta) => writeLog("error", message, meta),
  warn: (message, meta) => writeLog("warn", message, meta),
};

export default logger;
