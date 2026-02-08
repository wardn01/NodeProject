const express = require("express");
const router = express.Router();
const enemyController = require("../controllers/enemyController");

// enemy/all - Get all enemies sorted by total power (hp + attack + defense)
router.get("/all", enemyController.getEnemies);

// enemy/:id - Get a specific enemy by ID
router.get("/:id", enemyController.getEnemy);

module.exports = router;
