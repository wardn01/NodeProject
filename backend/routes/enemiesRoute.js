const express = require("express");
const router = express.Router();
const db = require("../dbSingleton").getConnection(); // db
const enemyController = require("../controllers/enemyController");

// 1. return all userss
router.get("/", enemyController.enemy);
// ela rw7
module.exports = router;
