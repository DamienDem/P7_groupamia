const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/Post');

router.post('/post/:id', postCtrl.createPost);
router.get('/posts', postCtrl.getAllPosts );
router.get('/post/:id', postCtrl.getOnePost );
router.put('/post/:id', postCtrl.updatePost);
router.delete('/post/:id', postCtrl.deletePost)

module.exports = router;