const express = require("express");
const router = express.Router();
const {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
} = require("../controller/teamController");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage: storage });

// Route to create an image
router.post("/", upload.single("image"), createImage);

// Route to get all images
router.get("/", getAllImages);

// Route to get an image by id
router.get("/:id", getImageById);

// Route to update an image by id
router.put("/:id", upload.single("image"), updateImage);

// Route to delete an image by id
router.delete("/:id", deleteImage);

module.exports = router;
