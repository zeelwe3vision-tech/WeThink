const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const organizationRoutes = require("./modules/organizations/organization.routes");
const departmentRoutes = require("./modules/departments/department.routes");
const roleRoutes = require("./modules/roles/role.routes");
const taskRoutes = require("./modules/tasks/task.routes");

const app = express();

/* =========================================================
   CORS
========================================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://wethink.we3vision.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// Middlewares FIRST
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/* =========================================================
   Body Parser
========================================================= */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

/* =========================================================
   Health Check
========================================================= */

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "WeThink Backend Running Successfully",
  });
});

/* =========================================================
   API Routes
========================================================= */

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/organizations", organizationRoutes);

app.use("/api/departments", departmentRoutes);

app.use("/api/roles", roleRoutes);

app.use("/api/tasks", taskRoutes);

/* =========================================================
   404 Handler
========================================================= */

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

/* =========================================================
   Global Error Handler
========================================================= */

app.use((error, req, res, next) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
