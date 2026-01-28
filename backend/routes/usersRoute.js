const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkAuth = require("../middleware/authMiddleware");

// user/register
router.post("/register", userController.register);
// user/login
router.post("/login", userController.login);
// user/profile
router.get("/profile", checkAuth, userController.profile);
// user/logout
router.post("/logout", checkAuth, userController.logout);

module.exports = router;
