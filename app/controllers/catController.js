const Cats = require("../models/Cat");

const getAllCats = async (req, res) => {
  const allCats = await Cats.find(); // Find all cats
  res.status(200).json({
    success: true,
    message: `${req.method} - request to Cat endpoint`,
    allCats,
  });
};

const getCatById = async (req, res) => {
  const { id } = req.params;
  const cat = await Cats.findById(id); // Find cat by ID
  if (!cat) {
    return res.status(404).json({
      success: false,
      message: `Cat with ID ${id} not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `${req.method} - request to Cat endpoint`,
    cat,
  });
};

const createCat = async (req, res) => {
  const { cat } = req.body;
  const newCat = await Cats.create(cat);
  console.log("data >>>>", newCat);
  res.status(200).json({
    success: true,
    message: `${req.method} - request to Cat endpoint`,
  });
};


const updateCat = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body.cat; // Get updated data
  const updatedCat = await Cats.findByIdAndUpdate(id, updateData, { new: true }); // Find and update cat
  if (!updatedCat) {
    return res.status(404).json({
      success: false,
      message: `Cat with ID ${id} not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `${req.method} - request to Cat endpoint`,
    updatedCat,
  });
};

const deleteCat = async (req, res) => {
  const { id } = req.params;
  const deletedCat = await Cats.findByIdAndDelete(id);
  if (!deletedCat) {
    return res.status(404).json({
      success: false,
      message: `Cat with ID ${id} not found`
    });
  }
  res.status(200).json({
    success: true,
    message: `${req.method} - request to Cat endpoint`,
    deletedCat
  });
};

module.exports = {
  createCat,
  getCatById,
  updateCat,
  deleteCat,
  getAllCats,
};
