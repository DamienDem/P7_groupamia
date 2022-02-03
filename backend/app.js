const express = require('express');
const morgan = require('morgan');
const path = require('path');

const userRoutes = require('./routes/User');
const postRoutes = require('./routes/Post');
const likeRoutes = require('./routes/Like');
const commentRoutes = require('./routes/Comment');

const app = express();

app
.use(express.json())
.use('/images', express.static(path.join(__dirname, 'images')))
.use(morgan('dev'))
.use('/', userRoutes)
.use('/', postRoutes)
.use('/', likeRoutes)
.use('/', commentRoutes)

module.exports = app;