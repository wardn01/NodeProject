const express = require("express");
const router = express.Router();
const weaponController = require("../controllers/weaponController");

// weapon/all
router.get("/all", weaponController.getWeapons);

// weapon/:id
router.get("/:id", weaponController.getWeapon);

module.exports = router;
