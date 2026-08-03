const taskService = require("./task.service");

/* =========================================================
   Get All Tasks
========================================================= */

exports.getTasks = async (req, res) => {
  try {
    const result = await taskService.getTasks({
      user: req.user,
      filters: req.query,
    });

    if (!result.success) {
      return res.status(result.statusCode || 500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get tasks controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch tasks",
    });
  }
};

/* =========================================================
   Get Task By ID
========================================================= */

exports.getTaskById = async (req, res) => {
  try {
    const result = await taskService.getTaskById({
      taskId: req.params.id,
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get task controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch task details",
    });
  }
};

/* =========================================================
   Create Task
========================================================= */

exports.createTask = async (req, res) => {
  try {
    const result = await taskService.createTask({
      taskData: req.body,
      files: req.files || [],
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("Create task controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to create task",
    });
  }
};

/* =========================================================
   Update Task
========================================================= */

exports.updateTask = async (req, res) => {
  try {
    const result = await taskService.updateTask({
      taskId: req.params.id,
      taskData: req.body,
      files: req.files || [],
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Update task controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to update task",
    });
  }
};

/* =========================================================
   Delete Task
========================================================= */

exports.deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask({
      taskId: req.params.id,
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Delete task controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to delete task",
    });
  }
};

/* =========================================================
   Update Task Status
========================================================= */

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Task status is required",
      });
    }

    const result = await taskService.updateTaskStatus({
      taskId: req.params.id,
      status,
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Update task status controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to update task status",
    });
  }
};

/* =========================================================
   Complete Task
========================================================= */

exports.completeTask = async (req, res) => {
  try {
    const result = await taskService.completeTask({
      taskId: req.params.id,
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Complete task controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to complete task",
    });
  }
};

/* =========================================================
   Upload Task Attachments
========================================================= */

exports.uploadTaskAttachments = async (req, res) => {
  try {
    const files = req.files || [];

    if (!files.length) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one attachment",
      });
    }

    const result = await taskService.uploadTaskAttachments({
      taskId: req.params.id,
      files,
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("Upload task attachments controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to upload attachments",
    });
  }
};

/* =========================================================
   Remove Task Attachment
========================================================= */

exports.removeTaskAttachment = async (req, res) => {
  try {
    const result = await taskService.removeTaskAttachment({
      taskId: req.params.id,
      attachmentId: req.params.attachmentId,
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Remove task attachment controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to remove attachment",
    });
  }
};

/* =========================================================
   Get Task Timeline
========================================================= */

exports.getTaskTimeline = async (req, res) => {
  try {
    const result = await taskService.getTaskTimeline({
      taskId: req.params.id,
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get task timeline controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch task timeline",
    });
  }
};

/* =========================================================
   Get Task Dependencies
========================================================= */

exports.getTaskDependencies = async (req, res) => {
  try {
    const result = await taskService.getTaskDependencies({
      taskId: req.params.id,
      user: req.user,
    });

    if (!result.success) {
      return res.status(result.statusCode || 400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get task dependencies controller error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch task dependencies",
    });
  }
};
