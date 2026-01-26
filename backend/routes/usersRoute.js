const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkAuth = require("../middleware/authMiddleware");

// user/register
router.post("/register", userController.register);
// user/login
router.post("/login", userController.login);
// user/logout
router.post("/logout", checkAuth, userController.logout);

// 2l l3esa esawe hek controller...... aw ana b3den bn2lhn
module.exports = router;
