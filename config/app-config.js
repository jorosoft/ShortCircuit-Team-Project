const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use('/libs', express.static('node_modules'));

module.exports = app;