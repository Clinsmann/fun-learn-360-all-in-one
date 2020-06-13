const createError = require('http-errors');

const handleErrors = (req, res, next) => {
  if (!req.user) return next(createError(401, 'Please login to view this page.'))
  next()
};

module.exports = handleErrors;
