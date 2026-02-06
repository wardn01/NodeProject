const express = require("express");
const router = express.Router();
const enemyController = require("../controllers/enemyController");

// enemy/enemies
router.get("/all", enemyController.getEnemies);

// enemy/:id
router.get("/:id", enemyController.getEnemy);

module.exports = router;
