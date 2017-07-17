var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require("express-session"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    ejs = require("ejs"),
    engine = require("ejs-mate"),
    bodyParser = require('body-parser'),
    multer = require("multer"),
    flash = require("connect-flash"),
    mongo = require("mongodb"),
    mongoose = require("mongoose"),
    expressValidator = require("express-validator"),
    db = mongoose.connection,
    config = require("./config/config");

mongoose.connect(config.database, function (err) {
    if (err) throw err;
    console.log("conected to DB");
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use("/public", express.static(path.join(__dirname, 'public')));
/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

/* handle file upload */
app.use(multer({dest: __dirname + '/uploads/'}).any());

/* favicon.ico Path */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* handel express session */
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

/* passport (this middleware must be after express-session middleware) */
app.use(passport.initialize());
app.use(passport.session());

/* Validator */
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* flash */
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

/* register Routers */
app.use('/', index);
app.use('/users', users);

app.get("*", function (req, res, next) {
    res.locals.userdata = req.user || null;
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', {errors: err});
});

/* Server */
app.listen(config.port, function () {
    console.log("app running");
});

module.exports = app;
