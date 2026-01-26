const express = require("express");
const router = express.Router();
const db = require("../dbSingleton").getConnection();

router.get("/", (req, res) => {
  const userId = req.session.user.id;
  const query =
    "SELECT * FROM player_builds WHERE user_id = ? ORDER BY created_at DESC";

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).send({ message: "Error fetching builds" });
    res.json(results);
  });
});

router.post("/add", (req, res) => {
  const { build_name, hp, attack, defense } = req.body;
  const userId = req.session.user.id;

  const query =
    "INSERT INTO player_builds (user_id, build_name, hp, attack, defense) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [userId, build_name, hp, attack, defense], (err, result) => {
    if (err) return res.status(500).send({ message: "Error saving build" });
    res.status(201).send({ message: "Build saved successfully!" });
  });
});

router.delete("/delete/:id", (req, res) => {
  const buildId = req.params.id;
  const userId = req.session.user.id;

  const query = "DELETE FROM player_builds WHERE id = ? AND user_id = ?";
  db.query(query, [buildId, userId], (err, result) => {
    if (err) return res.status(500).send({ message: "Error deleting build" });
    res.send({ message: "Build deleted!" });
  });
});

module.exports = router;
