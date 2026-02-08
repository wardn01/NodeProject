const db = require("../dbSingleton").getConnection();
//------------------------------- Build Middleware ------------------------------ //
// Middleware to check if user has reached build limit (5 builds per user)
const checkBuildLimit = (req, res, next) => {
  const userId = req.session.user.id;
  const nickname = req.session.user.nickname;

  const query = "SELECT build_name FROM builds WHERE user_id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .json({ message: "Server error checking build limits." });
    }

    if (results.length >= 5) {
      return res
        .status(400)
        .json({ message: "You have reached the maximum limit of 5 builds." });
    }

    const existingNames = results.map((b) => b.build_name);
    let generatedName = "";

    for (let i = 1; i <= 5; i++) {
      const buildName = `${nickname} #${i}`;
      if (!existingNames.includes(buildName)) {
        generatedName = buildName;
        break;
      }
    }

    req.session.build_name = generatedName;
    next();
  });
};

// Middleware to verify that the logged-in user owns the build they are trying to update or delete
const verifyBuildOwnership = (req, res, next) => {
  const buildId = req.params.id;
  const userId = req.session.user.id;

  if (!buildId || isNaN(buildId)) {
    return res.status(400).json({ message: "Invalid build ID" });
  }

  const query = "SELECT id FROM builds WHERE id = ? AND user_id = ?";

  db.query(query, [buildId, userId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .json({ message: "Server error verifying ownership" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Build not found or unauthorized" });
    }

    next();
  });
};

// Middleware to sanitize build input data (convert empty strings to null)
const sanitizeBuildInput = (req, res, next) => {
  // Skip if no body data
  if (!req.body) {
    req.body = {};
  }

  const data = req.body;
  const fields = ["hp", "attack", "defense", "points", "weapon_id", "enemy_id"];

  fields.forEach((field) => {
    if (data[field] !== undefined) {
      // Convert empty strings and "null" to null
      if (data[field] === "" || data[field] === "null") {
        data[field] = null;
      } else {
        // Convert to number for numeric fields
        const num = Number(data[field]);
        // If it's NaN and not explicitly null, set to null
        if (isNaN(num) && data[field] !== null) {
          data[field] = null;
        } else if (!isNaN(num)) {
          data[field] = num;
        }
      }
    }
  });

  next();
};

// Middleware to validate that at least one field is provided for update
const validateUpdateData = (req, res, next) => {
  const data = req.body || {};
  const imageName = req.file ? req.file.filename : null;
  const fields = ["hp", "attack", "defense", "points", "weapon_id", "enemy_id"];

  const hasFieldData = fields.some((field) => data[field] !== undefined);

  if (!hasFieldData && !imageName) {
    return res.status(400).json({ message: "No data provided to update." });
  }

  next();
};

// ------------------------------ Export Middleware Functions ------------------------------ //
module.exports = {
  checkBuildLimit,
  verifyBuildOwnership,
  sanitizeBuildInput,
  validateUpdateData,
};
