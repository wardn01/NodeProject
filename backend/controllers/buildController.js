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

    const builds = results.map((build) => ({
      ...build,
      image: build.image
        ? `${req.protocol}://${req.get("host")}/uploads/build/${build.image}`
        : null,
    }));

    res.status(200).json({ builds });
  });
};

// -------------------- Create New Build -------------------- //
const createBuild = (req, res) => {
  const userId = req.session.user.id;
  const buildName = req.session.build_name;

  const weapon_id = req.body.weapon_id || 1;

  const insertQuery = `
      INSERT INTO builds (user_id,weapon_id,enemy_id, build_name, points, hp, attack, defense, image) 
      VALUES (?, ?, ?, ?, 100, 50, 10, 10, NULL)
  `;

  db.query(insertQuery, [userId, weapon_id, null, buildName], (err, result) => {
    if (err) {
      console.error("Error inserting build:", err);
      return res
        .status(500)
        .json({ message: "Error saving build to database." });
    }

    res.status(201).json({
      message: "New build created!",
      build: {
        id: result.insertId,
        weapon_id: weapon_id,
        enemy_id: null,
        build_name: buildName,
        points: 100,
        hp: 50,
        attack: 10,
        defense: 10,
        image: null,
      },
    });
  });
};

// -------------------- Update Build -------------------- //
const updateBuild = (req, res) => {
  const buildId = req.params.id;
  const userId = req.session.user.id;
  const data = req.body;
  const imageName = req.file ? req.file.filename : null;

  let updates = [];
  let values = [];

  const fields = ["hp", "attack", "defense", "points", "weapon_id", "enemy_id"];
  fields.forEach((field) => {
    if (data[field] !== undefined) {
      let value =
        data[field] === "" || data[field] === "null" ? null : data[field];

      updates.push(`${field} = ?`);
      values.push(value);
    }
  });

  if (imageName) {
    updates.push("image = ?");
    values.push(imageName);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No data provided to update." });
  }

  const query = `UPDATE builds SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`;
  values.push(buildId, userId);

  db.query(query, values, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Failed to update build." });

    const imageUrl = imageName
      ? `${req.protocol}://${req.get("host")}/uploads/build/${imageName}`
      : null;

    res.status(200).json({ message: "Updated successfully!", imageUrl });
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
