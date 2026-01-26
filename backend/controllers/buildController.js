const db = require("../dbSingleton").getConnection(); // db

const allBuilds = (req, res) => {
  const userId = req.session.user.id;

  const query = `
    SELECT b.*, w.name AS weapon_name, w.element_type 
    FROM builds b
    JOIN weapons w ON b.weapon_id = w.id
    WHERE b.user_id = ? 
    ORDER BY b.created_at DESC`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send({ message: "Error" });
    }

    res.status(200).json(results);
  });
};

const addBuild = (req, res) => {
  const { build_name, weapon_id, hp, attack, defense } = req.body;
  const userId = req.session.user.id;

  const query = `
        INSERT INTO builds (user_id, weapon_id, build_name, hp, attack, defense) 
        VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [userId, weapon_id, build_name, hp, attack, defense],
    (err, result) => {
      if (err) return res.status(500).send({ message: "Error saving build" });
      res.status(201).send({ message: "Build saved successfully!" });
    },
  );
};

const deleteBuild = (req, res) => {
  const buildId = req.params.id;
  const userId = req.session.user.id;

  const query = `DELETE FROM builds WHERE id = ? AND user_id = ?`;

  db.query(query, [buildId, userId], (err, result) => {
    if (err) return res.status(500).send({ message: "Error saving build" });
    res.status(201).send({ message: "Build saved successfully!" });
  });
};

module.exports = { allBuilds, addBuild, deleteBuild };
