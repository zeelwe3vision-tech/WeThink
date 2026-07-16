// Chetan - 22/06/2026 - start
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
// Chetan - 22/06/2026 - end
