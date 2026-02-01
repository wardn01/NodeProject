const db = require("../dbSingleton").getConnection(); // db
const bcrypt = require("bcrypt"); // password

// ----- User Registration ----- //
const register = (req, res) => {
  const { username, nickname, email, password } = req.body;
  if (!username || !nickname || !email || !password) {
    return res.status(400).json({ message: "Missing data" });
  }

  // Validate username (only letters)
  const checkUsername = /^[A-Za-z]+$/.test(username);
  if (!checkUsername) {
    return res
      .status(400)
      .json({ message: "Username must contain only letters." });
  }

  // Validate password ( at least one letter and one number)
  const checkPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,8}$/.test(
    password,
  );
  if (!checkPassword) {
    return res.status(400).json({
      message: "Password must contain at least one letter and one number.",
    });
  }

  // Check if username or email already exists
  const checkUser = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(checkUser, [username, email], (err, results) => {
    if (err) {
      console.error("Error in database:", err);
      return res.status(500).send({ message: "Error registering!!" });
    }
    if (results.length > 0) {
      console.log("Username or email already exists.");
      return res
        .status(400)
        .send({ message: "Username or email already exists." });
    }
    createUser();
  });

  // Create new user
  const createUser = () =>
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

const update = (req, res) => {
  const userId = req.session.user.id;
  const { nickname, password } = req.body;

  if (!nickname && !password) {
    return res.status(400).json({ message: "No data to update" });
  }
  const updates = [];
  const params = [];
  if (nickname) {
    updates.push("nickname = ?");
    params.push(nickname);
  }
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    updates.push("password_hash = ?");
    params.push(hashedPassword);
  }
  params.push(userId);

  const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error in database:", err);
      return res.status(500).send({ message: "Error updating profile." });
    }
    res.send({ message: "Profile updated successfully." });
  }
  );;

};

const profile = (req, res) => {
  res.send({ user: req.session.user });
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
