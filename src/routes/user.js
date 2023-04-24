const express = require("express");
const {
  adminSignup,
  adminLogin,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByNameRegex,
} = require("../controllers/user");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("auth/signup", adminSignup);
router.post("auth/login", adminLogin);
router.get("/search/:name", getUserByNameRegex);

module.exports = router;
