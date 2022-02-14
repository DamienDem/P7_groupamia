const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

const postCtrl = require('../controllers/Post');

router.post('/post/:id',multer, postCtrl.createPost);
router.get('/posts', postCtrl.getAllPosts );
router.get('/post/:id', postCtrl.getOnePost );
router.put('/post/:id',multer, postCtrl.updatePost);
router.delete('/post/:id', postCtrl.deletePost)

module.exports = router;