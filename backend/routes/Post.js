const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/Post');

router.post('/post/:id',auth, postCtrl.createPost);
router.get('/posts',auth, postCtrl.getAllPosts );
router.get('/post/:id',auth, postCtrl.getOnePost );
router.put('/post/:id',auth, postCtrl.updatePost);
router.delete('/post/:id',auth, postCtrl.deletePost)

module.exports = router;