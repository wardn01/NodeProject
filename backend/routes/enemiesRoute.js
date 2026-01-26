const express = require("express");
const router = express.Router();
const enemyController = require("../controllers/enemyController");

// return all enemies
router.get("/allEnemies", enemyController.allEnemies);

// return single Enemy
router.get("/singleEnemy/:id", enemyController.singleEnemy);

module.exports = router;
