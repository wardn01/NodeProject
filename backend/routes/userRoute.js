const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkAuth = require("../middleware/authMiddleware");
const checkUser = require("../middleware/userMiddleware");

// user/register - Register a new user
router.post(
  "/register",
  checkUser.checkData,
  checkUser.checkUsername,
  checkUser.checkNickname,
  checkUser.checkEmail,
  checkUser.checkPassword,
  checkUser.checkUserIfExists,
  userController.register,
);

// user/login - Login an existing user
router.post(
  "/login",
  checkUser.checkData,
  checkUser.checkUserIfExists,
  userController.login,
);

// user/update - Update user profile (nickname, password)
router.post(
  "/update",
  checkAuth,
  checkUser.checkNickname,
  checkUser.checkPassword,
  userController.update,
);

// user/profile - Get user profile information
router.get("/profile", checkAuth, userController.profile);

// user/logout - Logout the current user
router.post("/logout", checkAuth, userController.logout);

module.exports = router;
