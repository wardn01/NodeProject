const db = require("../dbSingleton").getConnection(); // db
const bcrypt = require("bcrypt"); // password

// -------------------- User Registration -------------------- //
const register = (req, res) => {
  const { username, nickname, email, password } = req.body;
  if (!username || !nickname || !email || !password) {
    return res.status(400).json({ message: "Missing data" });
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

// -------------------- User Login -------------------- //
const login = (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(query, [username, username], (err, results) => {
    if (err) return res.status(500).send({ message: "Error on server." });

    if (results.length === 0) {
      return res.status(400).send({ message: "User dose not exist." });
    }

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err)
        return res.status(500).send({ message: "Error during comparison." });

      if (isMatch) {
        req.session.user = user;
        return res.send({
          message: "You have successfully logged in.",
          user: {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            email: user.email,
          },
        });
      } else {
        return res.status(400).send({ message: "Invalid password." });
      }
    });
  });
};

// -------------------- Update User Profile -------------------- //
// -------------------- Update User Profile -------------------- //
const update = async (req, res) => {
  const userId = req.session.user.id;
  const { nickname, password } = req.body;

  try {
    const updates = [];
    const params = [];

    if (nickname) {
      updates.push("nickname = ?");
      params.push(nickname);
      req.session.user.nickname = nickname;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push("password_hash = ?");
      params.push(hashedPassword);
    }

    if (updates.length === 0) {
      return res.status(400).send({ message: "No data to update." });
    }

    params.push(userId);

    const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    db.query(query, params, (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).send({ message: "Error updating profile." });
      }

      res.send({ message: "Profile updated successfully." });
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).send({ message: "Error updating profile." });
  }
};

// -------------------- Get User Profile -------------------- //
const profile = (req, res) => {
  res.send({
    user: {
      id: req.session.user.id,
      username: req.session.user.username,
      nickname: req.session.user.nickname,
      email: req.session.user.email,
    },
  });
};

// -------------------- User Logout -------------------- //
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Error terminating session." });
    }
    res.send({ message: "Successfully logged out." });
  });
};

module.exports = { register, login, update, profile, logout };
