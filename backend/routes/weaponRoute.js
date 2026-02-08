const express = require("express");
const router = express.Router();
const weaponController = require("../controllers/weaponController");

// weapon/all - Get all weapons
router.get("/all", weaponController.getWeapons);

// weapon/:id - Get details of a specific weapon by ID
router.get("/:id", weaponController.getWeapon);

module.exports = router;
