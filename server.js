// ===================================================
// -- Base
// ===================================================
//xx-- require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var Promise = require('bluebird');

// ===================================================
// -- Set Up the Bare Application Object
// ===================================================
var app = express();

// ===================================================
// -- Security
// ===================================================
var csrf = require('csurf');                // TODO: logic
var helmet = require('helmet');
app.use(helmet());

// ===================================================
// -- DEFAULTS
// ===================================================
var helloMessage = "Hello, Mundo!";

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());

// ===================================================
// -- VIEWS
// ===================================================
var hbs  = require('express-handlebars');

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// ===================================================
// -- ROUTES
// ===================================================
app.get('/', function (req, res) {
  res.status(200).json({
    message: "Hello World!!"
  });
});


// ===================================================
// -- Client Favicon Request
// --   simply returns a header
// --   from: https://gist.github.com/kentbrew/763822
// ===================================================
app.use(function(req, res, next) {
  // control for favicon
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    console.log('favicon requested');
    return;
  }
});

// ===================================================
// -- Client Error Handlers
// --   404 Handler
// ===================================================
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// ===================================================
// -- Server Error Handlers
// ===================================================
// Development
// Allow Stacktrace
if (app.get('env') === 'development') {
  app.use(function(error, req, res, next) {
    console.log('dev - 500 error');

    res.status(error.status || 500).json({
      message: error.message,
      error: error
    });
  });
}

// Production
// Remove Stacktrace
app.use(function(error, req, res, next) {
  console.log('prod - 500 error');

  res.status(error.status || 500).json({
    message: error.message,
    error: {}
  });
});


// ===================================================
// -- Start Listening for Requests
// ===================================================
var port = (process.env.PORT | '3500');

//listener = app.listen(process.env.PORT, function () {
listener = app.listen(port, function () {
  console.log('PORT ' + app.get('port') + ': UP --> Now Taking Requests!');
});

