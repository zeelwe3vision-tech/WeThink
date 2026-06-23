// Chetan - 22/06/2026 - start
const express = require("express");
const cors = require("cors");

const userRoutes = require("./modules/users/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

module.exports = app;
// Chetan - 22/06/2026 - end