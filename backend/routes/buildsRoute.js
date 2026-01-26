const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/authMiddleware");
const buildController = require("../controllers/buildController");

// build/allBuilds
router.get("/allBuilds", checkAuth, buildController.allBuilds);

// build/add
router.post("/addBuild", checkAuth, buildController.addBuild);

// build/deleteBuilds
router.delete("/deleteBuild/:id", checkAuth, buildController.deleteBuild);

module.exports = router;
