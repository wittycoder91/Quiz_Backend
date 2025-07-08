const express = require("express");
const settingsRouter = express.Router();
const settingsCtrl = require("../../controllers/settingsCtrl");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer configuration for logo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/images/logos/";
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, "logo_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// GET /settings/admin/get-settings
settingsRouter.get("/admin/get-settings", async (req, res) => {
  try {
    const result = await settingsCtrl.getSettings();
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /settings/admin/update-settings
settingsRouter.post("/admin/update-settings", async (req, res) => {
  try {
    const settingsData = req.body;
    const result = await settingsCtrl.updateSettings(settingsData);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /settings/admin/upload-logo
settingsRouter.post("/admin/upload-logo", upload.single("logo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "No logo file uploaded" 
      });
    }

    const imagePath = req.file.path;
    const result = await settingsCtrl.uploadLogo(imagePath);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    if (error.message === 'Only image files are allowed!') {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
});

// GET /settings/admin/get-logo
settingsRouter.get("/admin/get-logo", async (req, res) => {
  try {
    const result = await settingsCtrl.getLogo();
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = settingsRouter; 