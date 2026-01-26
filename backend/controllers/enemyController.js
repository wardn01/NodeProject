const db = require("../dbSingleton").getConnection(); // db

const allEnemies = (req, res) => {
  const query = `
        SELECT *, (hp + attack + defense) AS total_power 
        FROM enemies 
        ORDER BY total_power DESC
    `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("Error on server.");
    res.status(200).json(results);
  });
};

const singleEnemy = (req, res) => {
  const enemyId = req.params.id;
  const query = `
        SELECT *, (hp + attack + defense) AS total_power 
        FROM enemies 
        Where id = ?
    `;
  db.query(query, [enemyId], (err, results) => {
    if (err) return res.status(500).send("Error on server.", err);

    if (results.length === 0) {
      return res.status(404).send({ message: "Build deleted successfully!" });
    }
    res.status(200).json(results[0]);
  });
};

module.exports = { allEnemies, singleEnemy };
