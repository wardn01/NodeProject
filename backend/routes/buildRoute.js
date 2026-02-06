const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/authMiddleware");
const buildController = require("../controllers/buildController");

// build/allBuilds
router.get("/all", checkAuth, buildController.getBuilds);

// build/create
router.post("/create", checkAuth, buildController.createBuild);

// build/update/:id
router.put("/update/:id", checkAuth, buildController.updateBuild);

// build/delete/:id
router.delete("/delete/:id", checkAuth, buildController.deleteBuild);

module.exports = router;
