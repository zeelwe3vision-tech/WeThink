const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../../middleware/auth.middleware");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  completeTask,
  uploadTaskAttachments,
  removeTaskAttachment,
  getTaskTimeline,
  getTaskDependencies,
} = require("./task.controller");

const router = express.Router();

/* =========================================================
   Attachment Upload Configuration
========================================================= */

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 5,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error(
          "Invalid attachment type. Only images, PDF, Word, Excel and text files are allowed.",
        ),
      );
    }

    return callback(null, true);
  },
});

/* =========================================================
   Task List and Creation
========================================================= */

router.get("/", verifyToken, getTasks);

router.post("/", verifyToken, upload.array("attachments", 5), createTask);

/* =========================================================
   Single Task
========================================================= */

router.get("/:id", verifyToken, getTaskById);

router.put("/:id", verifyToken, upload.array("attachments", 5), updateTask);

router.delete("/:id", verifyToken, deleteTask);

/* =========================================================
   Task Status
========================================================= */

router.patch("/:id/status", verifyToken, updateTaskStatus);

router.patch("/:id/complete", verifyToken, completeTask);

/* =========================================================
   Task Attachments
========================================================= */

router.post(
  "/:id/attachments",
  verifyToken,
  upload.array("attachments", 5),
  uploadTaskAttachments,
);

router.delete(
  "/:id/attachments/:attachmentId",
  verifyToken,
  removeTaskAttachment,
);

/* =========================================================
   Task Timeline and Dependencies
========================================================= */

router.get("/:id/timeline", verifyToken, getTaskTimeline);

router.get("/:id/dependencies", verifyToken, getTaskDependencies);

/* =========================================================
   Multer Error Handler
========================================================= */

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Each attachment must be smaller than 10 MB."
          : error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  return next();
});

module.exports = router;
