// Validate username ( only letters)
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

// Validate password ( at least one letter and one number)
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

//
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

module.exports = { checkUsername, checkPassword, checkNickname };
