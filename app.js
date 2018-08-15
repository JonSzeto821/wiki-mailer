var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config()
console.log(process.env.Password);
console.log(process.env.Email);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var request = require('request');
var cheerio = require('cheerio');

request('https://en.wikipedia.org/wiki/Frenkie_de_Jong', function(err, resp, html) {
        if (!err){
          const $ = cheerio.load(html);
          console.log($("#firstHeading").outerHTML); 
      }
});

//nodemailer
// 'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    	service:'Gmail',
        // host: 'smtp.ethereal.email',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.Email, //account.user
            pass: process.env.Password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <jonszeto821@gmail.com>', // sender address
        to: '<wikiapptest1@gmail.com>', // list of receivers
        subject: 'NodeMailer - Wikipedia', // Subject line
        text: 'Hello world? plain text', // plain text body
        html: '<b>Password coming from .env</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});


module.exports = app;
