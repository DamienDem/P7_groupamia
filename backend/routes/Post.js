const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/Post');

router.post('/post/:id', postCtrl.createPost);

module.exports = router;