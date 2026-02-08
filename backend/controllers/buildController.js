const db = require("../dbSingleton").getConnection(); // db
const fs = require("fs");
const path = require("path");

// ------------------------------ Get All Builds for User ------------------------------ //
// Get all builds for the logged-in user
const getBuilds = (req, res) => {
  const userId = req.session.user.id;

  const query = "SELECT * FROM builds WHERE user_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching builds:", err);
      return res.status(500).json({ message: "Error fetching builds" });
    }

    // Map results to include full image URL if image exists
    const builds = results.map((build) => ({
      ...build,
      image: build.image
        ? `${req.protocol}://${req.get("host")}/uploads/build/${build.image}`
        : null,
    }));

    res.status(200).json({ builds });
  });
};

// ------------------------------ Create New Build ------------------------------ //
// Create a new build for the logged-in user
const createBuild = (req, res) => {
  const userId = req.session.user.id;
  const buildName = req.session.build_name;

  let weapon_id = req.body.weapon_id || 1;

  // Ensure weapon_id is a valid number
  weapon_id = Number(weapon_id);
  if (isNaN(weapon_id) || weapon_id < 1) {
    weapon_id = 1; // Default to 1 if invalid
  }

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

// ------------------------------ Update Build ------------------------------ //
// Update an existing build for the logged-in user
const updateBuild = (req, res) => {
  const buildId = req.params.id;
  const userId = req.session.user.id;
  const data = req.body;
  const imageName = req.file ? req.file.filename : null;

  // If new image uploaded, delete old image first
  if (imageName) {
    const getImageQuery =
      "SELECT image FROM builds WHERE id = ? AND user_id = ?";
    db.query(getImageQuery, [buildId, userId], (err, results) => {
      if (err) {
        console.error("Error fetching old image:", err);
      } else if (results.length > 0 && results[0].image) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "uploads",
          "build",
          results[0].image,
        );
        fs.unlink(oldImagePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting old image:", unlinkErr);
          } else {
            console.log("Old image deleted:", results[0].image);
          }
        });
      }
    });
  }

  let updates = [];
  let values = [];

  // Build update query with sanitized data
  const fields = ["hp", "attack", "defense", "points", "weapon_id", "enemy_id"];
  fields.forEach((field) => {
    if (data[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(data[field]);
    }
  });

  // If an image was uploaded, add it to the update query
  if (imageName) {
    updates.push("image = ?");
    values.push(imageName);
  }

  const query = `UPDATE builds SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`;
  values.push(buildId, userId);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating build:", err);
      return res.status(500).json({ message: "Failed to update build." });
    }

    // If an image was uploaded, include the full URL in the response
    const imageUrl = imageName
      ? `${req.protocol}://${req.get("host")}/uploads/build/${imageName}`
      : null;

    res.status(200).json({ message: "Updated successfully!", imageUrl });
  });
};

// ------------------------------ Delete Build ------------------------------ //
// Delete a build for the logged-in user
const deleteBuild = (req, res) => {
  const buildId = req.params.id;
  const userId = req.session.user.id;

  // First, get the image filename to delete it
  const getImageQuery = "SELECT image FROM builds WHERE id = ? AND user_id = ?";
  db.query(getImageQuery, [buildId, userId], (err, results) => {
    if (err) {
      console.error("Error fetching build image:", err);
      return res.status(500).json({ message: "Error deleting build" });
    }

    // Delete the image file if it exists
    if (results.length > 0 && results[0].image) {
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        "build",
        results[0].image,
      );
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting image file:", unlinkErr);
        } else {
          console.log("Image deleted:", results[0].image);
        }
      });
    }
  });

  const query = `DELETE FROM builds WHERE id = ? AND user_id = ?`;

  db.query(query, [buildId, userId], (err, result) => {
    if (err) {
      console.error("Error deleting build:", err);
      return res.status(500).json({ message: "Error deleting build" });
    }

    res.status(200).json({ message: "Build deleted successfully!" });
  });
};

// ------------------------------ Export Controller Functions ------------------------------ //
module.exports = { getBuilds, createBuild, updateBuild, deleteBuild };
