const db = require("../dbSingleton").getConnection(); // db
const bcrypt = require("bcrypt"); // password

const register = (req, res) => {
  const { username, nickname, email, password } = req.body;
  if (!username || !nickname || !email || !password) {
    return res.status(400).json({ message: "Missing data" });
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return;

    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) return;

      const query =
        "INSERT INTO users (username, nickname, email, password_hash) VALUES (?, ?, ?, ?)";
      db.query(
        query,
        [username, nickname, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error in database:", err);
            return res.status(500).send({ message: "Error registering!!" });
          }
          res.status(201).send({ message: "User registered!" });
        },
      );
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  console.log(username);

  if (!username || !password) {
    return res.status(400).json({ message: "Missing data" });
  }
  const query = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(query, [username, username], (err, results) => {
    if (err) return res.status(500).send({ message: "Error on server." });

    if (results.length === 0) {
      return res.status(400).send({ message: "Invalid username or password." });
    }

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err)
        return res.status(500).send({ message: "Error during comparison." });

      if (isMatch) {
        req.session.user = user;
        return res.send({
          message: "You have successfully logged in.",
          user: req.session.user,
        });
      } else {
        return res
          .status(400)
          .send({ message: "Invalid username/email or password." });
      }
    });
  });
};

const profile = (req, res) => {
  res.send({ user: req.session.user });
  console.log("Profile accessed:", req.session.user);
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Error terminating session." });
    }
    res.send({ message: "Successfully logged out ." });
  });
};

module.exports = { register, login, profile, logout };
