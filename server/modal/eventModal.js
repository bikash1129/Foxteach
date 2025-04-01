const mongoose = require("mongoose");

// Define the Event schema
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Event model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
