const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/User');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/user/:id', userCtrl.deleteUser);
router.put('/user/:id', userCtrl.updateProfil);

module.exports = router;