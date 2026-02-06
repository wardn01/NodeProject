const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkAuth = require("../middleware/authMiddleware");
const checkUser = require("../middleware/userMiddleware");

// user/register
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

// user/login
router.post(
  "/login",
  checkUser.checkData,
  checkUser.checkUserIfExists,
  userController.login,
);

// user/update
router.post(
  "/update",
  checkAuth,
  checkUser.checkNickname,
  checkUser.checkPassword,
  userController.update,
);

// user/profile
router.get("/profile", checkAuth, userController.profile);

// user/logout
router.post("/logout", checkAuth, userController.logout);

module.exports = router;
