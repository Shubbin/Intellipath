import mongoose from "mongoose";

/**
 * Express middleware to validate MongoDB ObjectIds in request parameters.
 * @param {String} paramName - Name of the parameter containing the ID (default: 'id')
 */
export const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error(`Invalid ${paramName} format: must be a valid 24-character hex string`));
    }
    
    next();
  };
};
