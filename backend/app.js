const express = require('express');
const morgan = require('morgan');
const res = require('express/lib/response');
const userRoutes = require('./routes/User');
const postRoutes = require('./routes/Post');
const likeRoutes = require('./routes/Like');
const commentRoutes = require('./routes/Comment');

const app = express();

app
.use(express.json())
.use(morgan('dev'))
.use('/', userRoutes)
.use('/', postRoutes)
.use('/', likeRoutes)
.use('/', commentRoutes)

app.get('/', (req,res) => res.send('Hello express !'))

module.exports = app;