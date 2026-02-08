const db = require("../dbSingleton").getConnection(); // db
// ------------------------------ User Middleware ------------------------------ //
// Validate required fields.
const checkData = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is required." });
  }

  const { username, password, nickname, email } = req.body;
  if (req.path === "/register") {
    if (!username || !password || !nickname || !email) {
      return res.status(400).json({
        message: "Username, password, nickname, and email are required.",
      });
    }
  } else if (req.path === "/login") {
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }
  }
  next();
};

// Validate email format.
const checkEmail = (req, res, next) => {
  if (!req.body.email) {
    return next();
  }
  const { email } = req.body;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValid) {
    return res.status(400).json({
      message: "Invalid email format.",
    });
  }
  next();
};

// Validate username ( only letters).
const checkUsername = (req, res, next) => {
  if (!req.body.username) {
    return next();
  }
  const { username } = req.body;
  const isValid = /^[A-Za-z]{2,}$/.test(username);
  if (!isValid) {
    return res.status(400).json({
      message:
        "Username must contain only letters and be at least 2 characters long.",
    });
  }
  next();
};

// Validate password ( at least one letter and one number).
const checkPassword = (req, res, next) => {
  if (!req.body.password) {
    return next();
  }
  const { password } = req.body;

  const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,8}$/.test(password);
  if (!isValid) {
    return res.status(400).json({
      message:
        "Password must contain at least one letter and one number and be between 3 and 8 characters long.",
    });
  }
  next();
};

// Validate nickname ( at least 2 characters).
const checkNickname = (req, res, next) => {
  if (!req.body.nickname) {
    return next();
  }
  const { nickname } = req.body;
  if (nickname && nickname.length < 2) {
    return res.status(400).json({
      message: "Nickname must be at least 2 characters.",
    });
  }
  next();
};

// Check if username or email already exists.
const checkUserIfExists = (req, res, next) => {
  const { username, email } = req.body;
  if (req.path === "/register") {
    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(query, [username, email], (err, results) => {
      if (err) return res.status(500).send({ message: "Error on server." });
      if (results.length > 0) {
        return res
          .status(400)
          .send({ message: "Username or email already exists." });
      }
      next();
    });
  } else if (req.path === "/login") {
    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(query, [username, username], (err, results) => {
      if (err) return res.status(500).send({ message: "Error on server." });
      if (results.length === 0) {
        return res.status(400).send({ message: "User does not exist." });
      }
      req.user = results[0];
      next();
    });
  } else {
    next();
  }
};

// ------------------------------ Export Middleware ------------------------------ //
module.exports = {
  checkUsername,
  checkPassword,
  checkNickname,
  checkEmail,
  checkData,
  checkUserIfExists,
};
