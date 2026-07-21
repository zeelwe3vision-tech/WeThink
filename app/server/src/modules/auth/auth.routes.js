const express = require("express");
const router = express.Router();

// Controller
const {
  login,
  logout,
  session,
  bootstrapStatus,
  bootstrap,
} = require("./auth.controller");

// Validation
const { loginValidation } = require("./auth.validation");

// Middleware
const { verifyToken } = require("../../middleware/auth.middleware");

router.post("/login", loginValidation, login);
router.post("/logout", verifyToken, logout);
router.get("/session", verifyToken, session);

// Bootstrap
router.get("/bootstrap-status", bootstrapStatus);
router.post("/bootstrap", bootstrap);

module.exports = router;
