exports.errHandler = (err, req, res, next) => {
  err.message = err.message;
  err.statusCode = err.statusCode;
  err.stack = err.stack;
  err.name = err.name;
  // let current_page = req.route.path;
  res.status(err.statusCode).json({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
};
