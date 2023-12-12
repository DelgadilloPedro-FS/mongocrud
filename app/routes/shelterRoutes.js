const router = require("express").Router();
const {
  getAllShelters,
  getShelterById,
  createShelter,
  deleteShelter,
  updateShelter,
} = require("../controllers/shelterController");

router.get("/", getAllShelters);
router.post("/", createShelter);
router.get("/:id", getShelterById);
router.delete("/:id", deleteShelter);
router.put("/:id", updateShelter);

module.exports = router;
