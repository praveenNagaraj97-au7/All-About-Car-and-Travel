exports.errHandler = (err, req, res, next) => {
  err.message = err.message;
  err.statusCode = err.statusCode;
  err.stack = err.stack;
  err.name = err.name;
  res.send(`<h1> Something went Wrong </h1>
  <ul>
      <li>Message = ${err.message} </li>
      <li>Where = ${err.stack} </li>
      <li>ErrorName = ${err.name} </li>
  </ul>`);
};
