const Shelters = require("../models/Shelter");

const getAllShelters = async (req, res) => {
  try {
    const allShelters = await Shelters.find().populate("cats");
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
  const shelter = await Shelters.findById(id).populate("cats");
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
  try {
    const { shelter } = req.body;
    const newShelter = await Shelters.create(shelter);
    console.log("data >>>>", newShelter);
    res.status(201).json({
      // Use 201 for successful creation
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
