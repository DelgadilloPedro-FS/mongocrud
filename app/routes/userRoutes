const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
