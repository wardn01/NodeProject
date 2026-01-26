const db = require("../dbSingleton").getConnection(); // db

const enemy = (req, res) => {
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

module.exports = { enemy };
