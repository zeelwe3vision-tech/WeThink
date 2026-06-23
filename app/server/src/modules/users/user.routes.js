// Chetan - 23/06/2026 - start

const express = require("express");
const router = express.Router();

const { createUser, getAllUsers } = require("./user.controller");

router.post("/", createUser);

router.get("/", getAllUsers);

module.exports = router;

// Chetan - 23/06/2026 - end
