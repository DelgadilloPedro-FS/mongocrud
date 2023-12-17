const Cat = require("../models/Cat");

const getAllCats = async (req, res) => {
  const allCats = await Cat.find(); // Find all cats
  res.status(200).json({
    success: true,
    message: `${req.method} - request to Cat endpoint`,
    allCats,
  });
};

const getCatById = async (req, res) => {
  const { id } = req.params;
  const cat = await Cat.findById(id); // Find cat by ID
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
  Cat.find({ name: cat.name, age: cat.age })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        return res.status(406).json({
          message: "Cat already in shelter",
        });
      }
      const newCat = Cat.create(cat);
      console.log("data >>>>", newCat);
      res.status(200).json({
        success: true,
        message: `${req.method} - Cat created successfully`,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: {
          message: "could not save cat",
        },
      });
    });
};

const updateCat = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body.cat; // Get updated data
  const updatedCat = await Cat.findByIdAndUpdate(id, updateData, { new: true }); // Find and update cat
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
      message: `Cat with ID ${id} not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `${req.method} - request to Cat endpoint`,
    deletedCat,
  });
};

module.exports = {
  createCat,
  getCatById,
  updateCat,
  deleteCat,
  getAllCats,
};
