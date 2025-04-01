const mongoose = require("mongoose");
const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resetToken: { type: String },
  tokenExpiry: { type: Date },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const userSchema = mongoose.model("User", userModel);
module.exports = userSchema;
