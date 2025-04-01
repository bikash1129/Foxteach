

const Image = require("../modal/teamModal");

// Create a new image
const createImage = async (req, res) => {
  const { name, description, spec } = req.body;  // Including spec field
  const file = req.file;

  if (!file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  try {
    const newImage = new Image({
      name,
      description,
      spec: spec || false, // If spec is not provided, default to false
      image: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });

    await newImage.save();
    res.status(201).json({ msg: "Image uploaded successfully", newImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get a single image by id
const getImageById = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Update an image by id
const updateImage = async (req, res) => {
  const { id } = req.params;
  const { name, description, spec } = req.body;  // Including spec field
  const file = req.file;

  try {
    let image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }

    image.name = name || image.name;
    image.description = description || image.description;
    image.spec = spec !== undefined ? spec : image.spec;  // Only update spec if provided

    if (file) {
      image.image.data = file.buffer;
      image.image.contentType = file.mimetype;
    }

    await image.save();
    res.status(200).json({ msg: "Image updated successfully", image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Delete an image by id
const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByIdAndDelete(id);
    res.status(200).json({ msg: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
};
