const db = require("../dbSingleton").getConnection(); // db

// -------------------- Get All Builds for User -------------------- //
const getBuilds = (req, res) => {
  const userId = req.session.user.id;

  const query = "SELECT * FROM builds WHERE user_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching builds:", err);
      return res.status(500).json({ message: "Error fetching builds" });
    }
    res.status(200).json({ builds: results });
  });
};

// -------------------- Create New Build -------------------- //
const createBuild = (req, res) => {
  const userId = req.session.user.id;
  const nickname = req.session.user.nickname;

  const query = "SELECT build_name FROM builds WHERE user_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (results.length >= 5) {
      return res
        .status(400)
        .json({ message: "You can only have up to 5 builds." });
    }

    let newBuildName = "";

    for (let i = 1; i <= 6; i++) {
      const buildName = `${nickname} #${i}`;

      const exists = results.some((build) => build.build_name === buildName);

      if (!exists) {
        newBuildName = buildName;
        break;
      }
    }

    const insertQuery = `
      INSERT INTO builds (user_id, weapon_id, build_name, points, hp, attack, defense) 
      VALUES (?, NULL, ?, 100, 100, 10, 10)
    `;

    db.query(insertQuery, [userId, newBuildName], (err, insertResult) => {
      if (err) {
        console.error("Error inserting build:", err);
        return res.status(500).json({ message: "Error saving build" });
      }

      res.status(201).json({
        message: "New build created!",
        buildId: insertResult.insertId,
        buildName: newBuildName,
        points: 100,
        hp: 100,
        attack: 10,
        defense: 10,
      });
    });
  });
};

// -------------------- Update Build -------------------- //
const updateBuild = (req, res) => {
  const buildId = req.params.id;
  const userId = req.session.user.id;
  const { hp, attack, defense, points, weapon_id } = req.body;

  const query = `
    UPDATE builds 
    SET hp = ?, attack = ?, defense = ?, points = ?, weapon_id = ?
    WHERE id = ? AND user_id = ?
  `;
  const values = [hp, attack, defense, points, weapon_id, buildId, userId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating build:", err);
      return res.status(500).json({ message: "Failed to update build" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Build not found or unauthorized" });
    }

    res.status(200).json({ message: "Build updated successfully!" });
  });
};

// -------------------- Delete Build -------------------- //
const deleteBuild = (req, res) => {
  const buildId = req.params.id;
  const userId = req.session.user.id;

  const query = `DELETE FROM builds WHERE id = ? AND user_id = ?`;

  db.query(query, [buildId, userId], (err, result) => {
    if (err) {
      console.error("Error deleting build:", err);
      return res.status(500).json({ message: "Error deleting build" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Build not found or unauthorized" });
    }
    res.status(200).json({ message: "Build deleted successfully!" });
  });
};

module.exports = { getBuilds, createBuild, updateBuild, deleteBuild };
