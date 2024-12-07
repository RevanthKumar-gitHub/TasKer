exports.errorHandler = (err, req, res, next) => {  
  const statusCode = err.statusCode || res.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "server error",
    stack : process.env.NODE_ENV === "production" ? null : err.stack
  });
};

exports.notFoundHandler = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: "Page not found",
  });
};
