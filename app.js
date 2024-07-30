var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catagoriesRouter = require('./routes/catagories');
var productsRouter = require('./routes/products');

var cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catagories', catagoriesRouter);
app.use('/products', productsRouter);

// connect to DB
// const connection = mongoose.connect('mongodb://localhost:27017/ShoesTrend')
const connection = mongoose.connect('mongodb://localhost:27017/ShoesTrend', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
    .catch(err => console.log('>>>>>>>>> DB Error: ', err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;