import dotenv from "dotenv";
import { validateEnvironment } from "./config/envValidate.js";

import logger from "./utils/logger.js";

// Initialize environment variables first
dotenv.config();

// Global process-level safety nets to prevent uncaught errors from crash-looping the server
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`CRITICAL: Unhandled Rejection at promise: ${promise}`, { reason: String(reason) });
});

process.on("uncaughtException", (error) => {
  logger.error("CRITICAL: Uncaught Exception thrown", { error: error.message, stack: error.stack });
});

// Ensure all critical enterprise configurations are present
validateEnvironment();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
