const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const clientRouter = require('./routes/client');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/client', clientRouter);

module.exports = app;