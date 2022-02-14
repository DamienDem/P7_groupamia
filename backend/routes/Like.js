const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/Like');

router.post('/like/:postId', likeCtrl.likePost)

module.exports = router;