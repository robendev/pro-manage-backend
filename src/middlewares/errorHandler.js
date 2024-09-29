const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || null;
  res.status(statusCode).json({ error: message, errors });
};

export default errorHandler;
