const express = require('express');
const morgan = require('morgan');
const res = require('express/lib/response');
const userRoutes = require('./routes/User');

const app = express();

app
.use(express.json())
.use(morgan('dev'))
.use('/', userRoutes);

app.get('/', (req,res) => res.send('Hello express !'))

module.exports = app;