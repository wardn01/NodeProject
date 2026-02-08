const db = require("../dbSingleton").getConnection(); // db

// ------------------------------ Get All Weapons ------------------------------ //
// Get all weapons
const getWeapons = (req, res) => {
  const query = "SELECT * FROM weapons";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching weapons:", err);
      return res.status(500).json({ message: "Server error fetching weapons" });
    }

    const weapon = results.map((weapon) => ({
      ...weapon,
      image: weapon.image
        ? `${req.protocol}://${req.get("host")}/uploads/weapon/${weapon.image}`
        : null,
    }));

    res.status(200).json({ weapons: weapon });
  });
};

// ------------------------------ Get Weapon by ID ------------------------------ //
// Get details of a specific weapon by ID
const getWeapon = (req, res) => {
  const weaponId = req.params.id;

  if (isNaN(weaponId)) {
    return res.status(400).json({ message: "Invalid weapon ID" });
  }

  const query = "SELECT * FROM weapons WHERE id = ?";

  db.query(query, [weaponId], (err, results) => {
    if (err) {
      console.error("Error fetching weapon:", err);
      return res.status(500).json({ message: "Server error fetching weapon" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Weapon not found" });
    }

    const weapon = {
      ...results[0],
      image: results[0].image
        ? `${req.protocol}://${req.get("host")}/uploads/weapon/${results[0].image}`
        : null,
    };

    res.status(200).json({ weapon: weapon });
  });
};

// ------------------------------ Export Controller Functions ------------------------------ //
module.exports = { getWeapons, getWeapon };
