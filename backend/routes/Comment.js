const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/Comment');


router.post('/addComment/:postId', auth, commentCtrl.createComment);
router.post('/updateComment/:id', auth, commentCtrl.updateComment);
router.delete('/deleteComment/:id/:userId', auth, commentCtrl.deleteComment);
router.get('/comments/:id', auth, commentCtrl.getAllComments);
router.get('/comment/:id', auth, commentCtrl.getOneComment);


module.exports = router;