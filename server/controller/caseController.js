const Event = require("../modal/caseModal");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { name, review } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const event = new Event({
      name,
      review,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { name, review } = req.body;

    const updatedData = { name, review };
    if (req.file) {
      updatedData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete All Suggestions
exports.deleteAllSuggestions = async (req, res) => {
  try {
    // Optional: Add authentication/authorization logic here if required

    const result = await Event.deleteMany({});
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No suggestions found to delete." });
    }

    return res.status(200).json({
      message: `${result.deletedCount} suggestions deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting all suggestions:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
