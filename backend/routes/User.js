const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

const userCtrl = require("../controllers/User");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/user/:id",  userCtrl.deleteUser);
router.put("/user/:id",  multer, userCtrl.updateProfil);

router.get("/users", userCtrl.getAllUsers);
router.get("/:id",  userCtrl.getOneUser);

module.exports = router;
