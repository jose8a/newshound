// ===================================================
// -- Base
// ===================================================
require('dotenv').config();
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var Promise = require('bluebird');
var handleErrors = require('./app/middlewares/error-handler');
var faviconHandler = require('./app/middlewares/favicon');

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
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(methodOverride());

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


console.log('env: ' + app.get('env'));

// == FAVICON ========================================
app.use(faviconHandler);

// == ERRORS =========================================
handleErrors(app);

// ===================================================
// -- Start Listening for Requests
// ===================================================
var port = (process.env.PORT || '3550');

//listener = app.listen(process.env.PORT, function () {
listener = app.listen(port, function () {
  console.log('PORT ' + this.address().port + ': UP --> Now Taking Requests!');
});

