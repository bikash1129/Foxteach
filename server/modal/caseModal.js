const mongoose = require("mongoose");

// Define the Event schema
const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    review: {
      type: String,
      required: true,
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
const caseModal = mongoose.model("Case", testSchema);

module.exports = caseModal;
