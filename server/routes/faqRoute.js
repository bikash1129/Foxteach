const express = require('express');
const {
    getAllContent,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
} = require('../controller/faqController');

const router = express.Router();

// CRUD routes
router.get('/', getAllContent); // Get all content
router.get('/:id', getContentById); // Get content by ID
router.post('/', createContent); // Create new content
router.put('/:id', updateContent); // Update content by ID
router.delete('/:id', deleteContent); // Delete content by ID

module.exports = router;
