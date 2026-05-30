/**
 * Recursive object cleansing function to eliminate MongoDB operators (keys starting with $)
 * and nested key references (keys containing .) to prevent query injection attacks.
 * @param {Object} obj - The request object segment to clean
 */
const clean = (obj) => {
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (key.startsWith("$") || key.includes(".")) {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        clean(obj[key]);
      }
    }
  }
  return obj;
};

/**
 * Express middleware to prevent NoSQL Query Injection globally.
 */
export const nosqlSanitizer = (req, res, next) => {
  if (req.body) clean(req.body);
  if (req.query) clean(req.query);
  if (req.params) clean(req.params);
  next();
};
