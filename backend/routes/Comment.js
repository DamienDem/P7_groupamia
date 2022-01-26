const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/Comment');


router.post('/:postId/addComment', commentCtrl.createComment);
router.post('/:id/updateComment', commentCtrl.updateComment);
router.delete('/:id/:userId/deleteComment', commentCtrl.deleteComment);
router.get('/', commentCtrl.getAllComments);
router.get('/:id', commentCtrl.getOneComment);


module.exports = router;