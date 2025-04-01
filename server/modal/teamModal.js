const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  spec:{
    type:Boolean,
    default:false
  }
});

const Image = mongoose.model("Team", imageSchema);

module.exports = Image;
