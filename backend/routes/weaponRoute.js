const express = require("express");
const router = express.Router();
const enemyController = require("../controllers/weaponController");

// return all weapons
router.get("/all", enemyController.getAllWeapons);

// return weapon by id
router.get("/:id", enemyController.getWeaponById);

module.exports = router;
