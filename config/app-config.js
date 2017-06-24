const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();


app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use('/libs', express.static('node_modules'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'alabala',
    resave: true,
    saveUninitialized: true,
}));

require('./passport-config')(app);

module.exports = app;
