const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/Comment');


router.post('/:postId/addComment', commentCtrl.createComment)

module.exports = router;