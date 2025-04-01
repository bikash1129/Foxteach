const express = require("express");
const router = express.Router();
const eventController = require("../controller/testalController");
const multer = require("multer");
const storage = multer.memoryStorage();
const middlewares = require("../middlewares/authMiddleware");
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

// Create an event
router.post(
  "/add-event",
  upload.single("image"),

  eventController.createEvent
);

// Get all events
router.get("/get-event",  eventController.getEvents);

// Get an event by ID
router.get("/:id",  eventController.getEventById);

// Update an event
router.put(
  "/update/:id",

  upload.single("image"),
  eventController.updateEvent
);

// Delete an event
router.delete("/delete/:id",  eventController.deleteEvent);
router.delete("/delete-all", eventController.deleteAllSuggestions);

module.exports = router;
