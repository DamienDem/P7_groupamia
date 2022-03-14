const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer');

const commentCtrl = require('../controllers/Comment');

router.post('/addComment/:postId', multer, commentCtrl.createComment);
router.put('/updateComment/:id',  multer, commentCtrl.updateComment);
router.delete('/deleteComment/:id',  commentCtrl.deleteComment);
router.get('/comments', commentCtrl.getAllComments);
router.get('/comment/:id',  commentCtrl.getOneComment);


module.exports = router;