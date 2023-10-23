var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mlogger = require("morgan");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { logError, returnError } = require("./errors");
const { logger } = require("./logger");

var app = express();
var cors = require('cors');
const judgeRouter = require('./routes/judge');
app.use(cors())

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(mlogger("dev", { stream: { write: (msg) => logger.info(msg) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/judge', judgeRouter);

app.use(logError);
app.use(returnError);

module.exports = app;
