const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require("./modules/db");
const auth = require("./modules/auth");
const cycleRoute = require('./routes/api/cycleRoute'); //omar





const indexRouter = require('./routes/index');
const geoRouter = require('./routes/geo');
const weatherRouter = require('./routes/weather');


const userApiRouter = require("./routes/api/user");


const app = express();

const hbs = require('hbs');

// user.addUser("bob", "bob@bob.com", "1234");

// register partials
hbs.registerPartials(__dirname + '/views/partials');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.init();



app.use(auth);


app.use('/api/user', userApiRouter);

app.use('/', indexRouter);
app.use('/api/routes', cycleRoute);//Omar


app.use('/geo', geoRouter);

app.use('/weather', weatherRouter);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
