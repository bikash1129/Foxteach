const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  subject: {
    type: String,
  },
  getTouch:{
    type:Boolean,
    default:false
  },
  related:{
    type:String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
