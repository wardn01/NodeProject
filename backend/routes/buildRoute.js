const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const buildController = require("../controllers/buildController");
const checkBuild = require("../middleware/buildMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/build/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/all", buildController.getBuilds);

router.post("/create", checkBuild.checkBuildLimit, buildController.createBuild);

router.put("/update/:id", upload.single("image"), buildController.updateBuild);

router.delete("/delete/:id", buildController.deleteBuild);

module.exports = router;
