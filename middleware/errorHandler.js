const errorHandler = (err, req, res, next) => {
  // Safeguard: Ensure that 'res' and 'err' are properly defined
  if (!res) {
    console.error("Response object (res) is undefined");
    return;
  }

  if (err) {
    console.error(err.stack || err); // Log the error stack or the error itself
  }

  // Default status code if not explicitly set
  let statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err?.message || "Server Error";

  // Handle Mongoose Validation Errors
  if (err?.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Handle Mongoose Duplicate Key Error
  if (err?.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue);
    message = `${field} already exists. Please use another value.`;
  }

  // Handle Mongoose Cast Error (invalid ObjectId)
  if (err?.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Multer File Upload Error Handling
  if (err.message === "Only PDF files are allowed!") {
    statusCode = 400;
    message = err.message;
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    message = "File size should be less than or equal to 5MB";
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Conditionally include the stack trace
  });
};

module.exports = errorHandler;
