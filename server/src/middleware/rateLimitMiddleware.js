const rateLimits = new Map();

/**
 * Lightweight, in-memory rate limiting middleware.
 * @param {Object} options - Configuration options
 * @param {Number} options.windowMs - Time window in milliseconds (default: 1 minute)
 * @param {Number} options.max - Max requests allowed per window (default: 15)
 * @param {String} options.message - Error message response on rate-limit breach
 */
export const rateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 60 * 1000; // 1 minute
  const max = options.max || 15;
  const message = options.message || "Too many requests from this client. Please wait and try again later.";

  return (req, res, next) => {
    // Extract IP address securely
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const now = Date.now();

    if (!rateLimits.has(ip)) {
      rateLimits.set(ip, []);
    }

    let requestTimestamps = rateLimits.get(ip);
    
    // Purge timestamps older than the active window
    requestTimestamps = requestTimestamps.filter((time) => now - time < windowMs);
    requestTimestamps.push(now);
    
    rateLimits.set(ip, requestTimestamps);

    if (requestTimestamps.length > max) {
      res.status(429).json({
        success: false,
        message,
      });
      return;
    }

    next();
  };
};
