const db = require("../dbSingleton").getConnection(); // db

// -------------------- Get All Weapons -------------------- //
const getWeapons = (req, res) => {
  const query = "SELECT * FROM weapons";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching weapons:", err);
      return res.status(500).json({ message: "Server error fetching weapons" });
    }

    const weapon = results.map((weapon) => ({
      ...weapon,
      image: `${req.protocol}://${req.get("host")}/uploads/weapon/${weapon.image}`,
    }));

    res.status(200).json({ weapons: weapon });
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

    const weapon = {
      ...results[0],
      image: `${req.protocol}://${req.get("host")}/uploads/weapon/${results[0].image}`,
    };

    res.status(200).json({ weapon: weapon });
  });
};

module.exports = { getWeapons, getWeapon };
