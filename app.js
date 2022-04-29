const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const carRouter = require('./routes/carRoute');
const clientRouter = require('./routes/clientRoute');
const rentalRouter = require('./routes/rentalRoute');

const carApiRouter = require('./routes/api/CarApiRoute');
const clientApiRouter = require('./routes/api/ClientApiRoute');
const rentalApiRouter = require('./routes/api/RentalApiRoute');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use('/', indexRouter);
app.use('/cars', carRouter);
app.use('/clients', clientRouter);
app.use('/rentals', rentalRouter);

app.use('/api/cars', carApiRouter);
app.use('/api/clients', clientApiRouter);
app.use('/api/rentals', rentalApiRouter);

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });

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
