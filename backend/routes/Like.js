const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/Like');

router.post('/:postId/like', likeCtrl.likePost)

module.exports = router;