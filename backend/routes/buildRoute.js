const express = require("express");
const router = express.Router();
const buildController = require("../controllers/buildController");

// build/allBuilds
router.get("/all", buildController.getBuilds);

// build/create
router.post("/create", buildController.createBuild);

// build/update/:id
router.put("/update/:id", buildController.updateBuild);

// build/delete/:id
router.delete("/delete/:id", buildController.deleteBuild);

module.exports = router;
