const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

const userCtrl = require("../controllers/User");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/user/:id", auth, userCtrl.deleteUser);
router.put("/user", auth, multer, userCtrl.updateProfil);

router.get("/users", auth, userCtrl.getAllUsers);
router.get("/user/:id", auth, userCtrl.getOneUser);
router.get("/", userCtrl.authentification);
router.get('/logout',auth, userCtrl.logout)

module.exports = router;
