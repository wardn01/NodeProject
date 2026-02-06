const db = require("../dbSingleton").getConnection(); // db
const bcrypt = require("bcrypt"); // password

// -------------------- User Registration -------------------- //
const register = (req, res) => {
  const { username, nickname, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).send({ message: "Error generating salt." });

    bcrypt.hash(password, salt, (err, passwordHash) => {
      if (err)
        return res.status(500).send({ message: "Error hashing password." });

      const query =
        "INSERT INTO users (username, nickname, email, password_hash) VALUES (?, ?, ?, ?)";

      db.query(query, [username, nickname, email, passwordHash], (err) => {
        if (err) {
          console.error("DB Error:", err);
          return res.status(500).send({ message: "Error registering user." });
        } else {
          res.status(200).send({ message: "User registered successfully." });
        }
      });
    });
  });
};

// -------------------- User Login -------------------- //
const login = (req, res) => {
  const { password } = req.body;
  const user = req.user;

  bcrypt.compare(password, user.password_hash, (err, isMatch) => {
    if (err) {
      console.error("Bcrypt Error:", err);
      return res.status(500).send({ message: "Error during login." });
    }
    if (!isMatch) {
      return res.status(400).send({ message: "Incorrect password." });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
    };

    res.status(200).send({ message: "Login successful." });
  });
};

// -------------------- Update User Profile -------------------- //
const update = (req, res) => {
  const userId = req.session.user.id;
  const { nickname, password } = req.body;

  const executeUpdate = (passwordHash) => {
    const updates = [];
    const params = [];

    if (nickname) {
      updates.push("nickname = ?");
      params.push(nickname);
    }

    if (passwordHash) {
      updates.push("password_hash = ?");
      params.push(passwordHash);
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
      if (nickname) req.session.user.nickname = nickname;
      res.status(200).send({ message: "Profile updated successfully." });
    });
  };

  if (password) {
    bcrypt.hash(password, 10, (err, passwordHash) => {
      if (err) {
        console.error("Hash Error:", err);
        return res.status(500).send({ message: "Error processing password." });
      }
      executeUpdate(passwordHash);
    });
  } else {
    executeUpdate(null);
  }
};

// -------------------- Get User Profile -------------------- //
const profile = (req, res) => {
  const user = req.session?.user;

  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.status(200).send({
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    email: user.email,
  });
};

// -------------------- User Logout -------------------- //
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).send({ message: "Error during logout." });
    }

    res.clearCookie("connect.sid");
    res.status(200).send({ message: "Logout successful." });
  });
};

// -------------------- Export Controllers -------------------- //
module.exports = { register, login, update, profile, logout };
