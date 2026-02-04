const db = require("../dbSingleton").getConnection(); // db

const allBuilds = (req, res) => {
  const userId = req.session.user.id;

  const query = "SELECT * FROM builds WHERE user_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send({ message: "Error" });
    }
    res.status(200).json({ builds: results });
  });
};

const createBuild = (req, res) => {
  const userId = req.session.user.id;

  const query = "SELECT COUNT(*) AS buildCount FROM builds WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send({ message: "Error" });
    }
    const buildCount = results[0].buildCount;
    if (buildCount >= 5) {
      return res
        .status(400)
        .send({ message: "You can only have up to 5 builds." });
    }
    const newBuildName = `MyHero${buildCount + 1}`;
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

    res.json({ message: "Build updated successfully!" });
  });
};

const deleteBuild = (req, res) => {
  const buildId = req.params.id;
  const userId = req.session.user.id;

  const query = `DELETE FROM builds WHERE id = ? AND user_id = ?`;

  db.query(query, [buildId, userId], (err, result) => {
    if (err) return res.status(500).send({ message: "Error deleting build" });
    res.status(201).send({ message: "Build deleted successfully!" });
  });
};

module.exports = { allBuilds, createBuild, updateBuild, deleteBuild };
