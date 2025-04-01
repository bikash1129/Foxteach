const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
