const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/Like');
const auth = require("../middleware/auth");

router.post('/like/:postId',auth, likeCtrl.likePost)
router.get('/likes',auth, likeCtrl.getAllLikes)

module.exports = router;