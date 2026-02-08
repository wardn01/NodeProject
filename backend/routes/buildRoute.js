const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const buildController = require("../controllers/buildController");
const checkBuild = require("../middleware/buildMiddleware");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/build/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// build/all - Get all builds for the logged-in user
router.get("/all", buildController.getBuilds);

// build/create - Create a new build for the logged-in user
router.post("/create", checkBuild.checkBuildLimit, buildController.createBuild);

// build/update/:id - Update an existing build
router.put(
  "/update/:id",
  checkBuild.verifyBuildOwnership,
  checkBuild.sanitizeBuildInput,
  upload.single("image"),
  checkBuild.validateUpdateData,
  buildController.updateBuild,
);

// build/delete/:id - Delete an existing build
router.delete(
  "/delete/:id",
  checkBuild.verifyBuildOwnership,
  buildController.deleteBuild,
);

// -------------------- Export Router -------------------- //
module.exports = router;
