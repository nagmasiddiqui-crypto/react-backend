export const errorMiddleware = (err, req, res, next) => {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // MongoDB duplicate key error
  if (err.code === 11000) {
    err.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err.statusCode = 400;
  }

  // JWT invalid error
  if (err.name === "JsonWebTokenError") {
    err.message = "Invalid JSON Web Token";
    err.statusCode = 400;
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    err.message = "JSON Web Token has expired";
    err.statusCode = 400;
  }

  // ✅ SEND RESPONSE (this was broken before)
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
