const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

const userCtrl = require('../controllers/User');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/user/:id',auth, userCtrl.deleteUser);
router.put('/user/:id',auth, multer, userCtrl.updateProfil);
router.get('/',auth, userCtrl.getAllUsers);
router.get('/:id',auth, userCtrl.getOneUser);

module.exports = router;