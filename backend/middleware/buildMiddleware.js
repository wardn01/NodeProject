const db = require("../dbSingleton").getConnection();

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

module.exports = { checkBuildLimit };
