const Content = require('../modal/faqModal');

// Get all content
const getAllContent = async (req, res) => {
    try {
        const content = await Content.find();
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single content by ID
const getContentById = async (req, res) => {
    try {
        console.log("COme")
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new content
const createContent = async (req, res) => {
    try {
        const { headline, description } = req.body;
        const newContent = new Content({ headline, description });
        await newContent.save();
        res.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update content by ID
const updateContent = async (req, res) => {
    try {
        const updatedContent = await Content.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(updatedContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete content by ID
const deleteContent = async (req, res) => {
    try {
        console.log("Come")
        const deletedContent = await Content.findByIdAndDelete(req.params.id);
        if (!deletedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        console.log("Error" + error)
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllContent,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
};
