// Chetan - 23/06/2026 - start
const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getManagers,
} = require("./user.controller");

const { createUserValidation } = require("./user.validation");

router.post("/", createUserValidation, createUser);
router.get("/", getAllUsers);
router.get("/managers", getManagers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
// Chetan - 23/06/2026 - end
