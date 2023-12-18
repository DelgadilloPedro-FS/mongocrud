const Shelters = require("../models/Shelter");

const getAllShelters = async (req, res) => {
  try {
    const allShelters = await Shelters.find().select("-__v").populate("cats");
    res.status(200).json({
      success: true,
      message: `${req.method} - request to Shelter endpoint`,
      allShelters,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getShelterById = async (req, res) => {
  const { id } = req.params;
  const shelter = await Shelters.findById(id).select("name _id").populate("cats", "name age breed");
  if (!shelter) {
    return res.status(404).json({
      success: false,
      message: `Shelter with ID ${id} not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `${req.method} - request to Shelter endpoint`,
    shelter,
  });
};

const createShelter = async (req, res) => {
  const { shelter } = req.body;

  // Check if a shelter with the same name already exists
  const existingShelter = await Shelters.find({ name: shelter.name });
  console.log(existingShelter)
  if (existingShelter.length>0) {
    return res.status(406).json({
      message: "Shelter with this name already exists",
    });
  }

  // Create the new shelter if it doesn't exist
  try {
    const newShelter = await Shelters.create(shelter);
    console.log("data >>>>", newShelter);
    res.status(201).json({
      success: true,
      message: `Shelter created successfully`,
      shelter: newShelter,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      res.status(400).json({
        success: false,
        message: "Validation errors occurred",
        errors: validationErrors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Unexpected error occurred", // Adjust error exposure based on environment
      });
    }
  }
};


const updateShelter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body.shelter;
    const updatedShelter = await Shelters.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedShelter) {
      return res.status(404).json({
        success: false,
        message: `Shelter with ID ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Shelter updated successfully`,
      shelter: updatedShelter,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      res.status(400).json({
        success: false,
        message: "Validation errors occurred",
        errors: validationErrors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error:
          error.message
      });
    }
  }
};

const deleteShelter = async (req, res) => {
  const { id } = req.params;
  const deletedShelter = await Shelters.findByIdAndDelete(id);
  if (!deletedShelter) {
    return res.status(404).json({
      success: false,
      message: `Shelter with ID ${id} not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `${req.method} - request to Shelter endpoint`,
    deletedShelter,
  });
};

module.exports = {
  createShelter,
  getShelterById,
  updateShelter,
  deleteShelter,
  getAllShelters,
};
