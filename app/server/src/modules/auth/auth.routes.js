const express = require("express");

const router = express.Router();

// Controller
const { login, googleLogin, logout, session } = require("./auth.controller");

// Validation
const { loginValidation } = require("./auth.validation");

// Middleware
const { verifyToken } = require("../../middleware/auth.middleware");

router.post("/login", loginValidation, login);
router.post("/google", googleLogin);
router.post("/logout", verifyToken, logout);
router.get("/session", verifyToken, session);

module.exports = router;
