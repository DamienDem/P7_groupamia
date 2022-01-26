const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/Comment');


router.post('/addComment/:postId', commentCtrl.createComment);
router.post('/updateComment/:id', commentCtrl.updateComment);
router.delete('/deleteComment/:id/:userId', commentCtrl.deleteComment);
router.get('/', commentCtrl.getAllComments);
router.get('/comment/:id', commentCtrl.getOneComment);


module.exports = router;