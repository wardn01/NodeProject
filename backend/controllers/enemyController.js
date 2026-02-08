const db = require("../dbSingleton").getConnection();

// ------------------------------ Get All Enemies ------------------------------ //
// Get all enemies sorted by total power (hp + attack + defense)
const getEnemies = (req, res) => {
  const query = `
        SELECT *, (hp + attack + defense) AS total_power 
        FROM enemies 
        ORDER BY total_power DESC
    `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB Error fetching enemies:", err);
      return res
        .status(500)
        .json({ message: "Server error fetching enemies." });
    }

    // Map results to include full image URL
    const enemies = results.map((enemy) => ({
      ...enemy,
      image: enemy.image
        ? `${req.protocol}://${req.get("host")}/uploads/enemy/${enemy.image}`
        : null,
    }));

    res.status(200).json({ enemies: enemies });
  });
};

// ------------------------------ Get Enemy by ID ------------------------------ //
// Get details of a specific enemy by ID
const getEnemy = (req, res) => {
  const enemyId = req.params.id;

  if (isNaN(enemyId)) {
    return res.status(400).json({ message: "Invalid enemy ID." });
  }

  const query = `
        SELECT *, (hp + attack + defense) AS total_power 
        FROM enemies 
        WHERE id = ?
    `;

  db.query(query, [enemyId], (err, results) => {
    if (err) {
      console.error("DB Error fetching enemy:", err);
      return res.status(500).json({ message: "Server error fetching enemy." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Enemy not found!" });
    }

    // Include full image URL in the response
    const enemy = {
      ...results[0],
      image: results[0].image
        ? `${req.protocol}://${req.get("host")}/uploads/enemy/${results[0].image}`
        : null,
    };

    res.status(200).json({ enemy: enemy });
  });
};

// ------------------------------ Export Controller Functions ------------------------------ //
module.exports = { getEnemies, getEnemy };
