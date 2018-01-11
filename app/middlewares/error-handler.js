// ===================================================
// -- Client Error Handlers
// --   404 Handler
// ===================================================
var handle404 = function(req, res, next) {
  console.error('404 - not found');
  res.status(404).send('Route Not Found');
};

// ===================================================
// -- Server Error Handlers
// ===================================================
// Development
// Allow Stacktrace
var handleDev5xx = function(error, req, res, next) {
  var status = error.status || 500;
  res.status(status).json({
    "message": error.message,
    "error": error
  });
};


// Production
// Remove Stacktrace
var handleProd5xx = function(error, req, res, next) {
  var status = error.status || 500;
  res.status(status).json({
    message: error.message,
    error: {}
  });
};

var handleErrors = function(app) {
  app.use(handle404);

  if (app.get('env') === 'development') {
    app.use(handleDev5xx);
  } else {
    app.use(handleProd5xx);
  }
}

module.exports = handleErrors;

