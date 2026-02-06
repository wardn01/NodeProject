const db = require("../dbSingleton").getConnection(); // db

// -------------------- Get All Weapons -------------------- //
const getWeapons = (req, res) => {
  const query = "SELECT * FROM weapons";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching weapons:", err);
      return res.status(500).json({ message: "Server error fetching weapons" });
    }

    res.status(200).json({ weapons: results });
  });
};

// -------------------- Get Weapon by ID -------------------- //
const getWeapon = (req, res) => {
  const weaponId = req.params.id;
  const query = "SELECT * FROM weapons WHERE id = ?";
  db.query(query, [weaponId], (err, results) => {
    if (err) {
      console.error("Error fetching weapon:", err);
      return res.status(500).json({ message: "Server error fetching weapon" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Weapon not found" });
    }
    res.status(200).json({ weapon: results[0] });
  });
};

module.exports = { getWeapons, getWeapon };
