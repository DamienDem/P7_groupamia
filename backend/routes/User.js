const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/user/:id',auth, userCtrl.deleteUser);
router.put('/user/:id',auth, userCtrl.updateProfil);

module.exports = router;