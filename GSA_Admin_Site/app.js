var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var routes = require('./routes/views');
var users = require('./routes/users');
var api = require('./routes/rest');

var securityWhitelist = [
    '/login',
    '/api/login'
];

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.use(function (req, res, next) {
    var secure = true;
    for (var i in securityWhitelist)
        if (securityWhitelist[i] == req.url)
            secure = false;
    if (secure)
        jwt.verify(req.cookies.hoochGSAAdminLogin, 'testing', function (err, decoded) {
            if (err) {
                res.writeHead(302, {
                    'Location': '/login'
                });
                res.end();
                return;
            }
            next();
        });
    else
        next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
