const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const organizationRoutes = require("./modules/organizations/organization.routes");
const departmentRoutes = require("./modules/departments/department.routes");
const roleRoutes = require("./modules/roles/role.routes");

const app = express();

// Middlewares FIRST
app.use(cors());
app.use(express.json());

// Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/roles", roleRoutes);

module.exports = app;
