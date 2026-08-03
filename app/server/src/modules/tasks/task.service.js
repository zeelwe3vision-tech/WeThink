const supabase = require("../../config/supabase");

/* =========================================================
   Constants
========================================================= */

const ALLOWED_PRIORITIES = ["Low", "Medium", "High", "Critical"];

const ALLOWED_STATUSES = ["To Do", "In Progress", "Review", "Completed"];

/* =========================================================
   Helpers
========================================================= */

const successResult = (data = {}) => ({
  success: true,
  ...data,
});

const errorResult = (message, statusCode = 400) => ({
  success: false,
  message,
  statusCode,
});

const parseArrayField = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [value];
  }
};

const normalizeDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

const validateTaskDates = (startDate, dueDate) => {
  if (!startDate || !dueDate) {
    return null;
  }

  const start = new Date(startDate);
  const due = new Date(dueDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(due.getTime())) {
    return "Invalid starting date or due date";
  }

  if (due < start) {
    return "Due date cannot be earlier than starting date";
  }

  return null;
};

const validateTaskData = (taskData, isUpdate = false) => {
  const requiredFields = [
    "title",
    "description",
    "project",
    "module",
    "priority",
    "status",
    "startDate",
    "dueDate",
  ];

  if (!isUpdate) {
    const missingField = requiredFields.find(
      (field) =>
        taskData[field] === undefined ||
        taskData[field] === null ||
        String(taskData[field]).trim() === "",
    );

    if (missingField) {
      return `${missingField} is required`;
    }
  }

  if (taskData.priority && !ALLOWED_PRIORITIES.includes(taskData.priority)) {
    return "Invalid task priority";
  }

  if (taskData.status && !ALLOWED_STATUSES.includes(taskData.status)) {
    return "Invalid task status";
  }

  const dateError = validateTaskDates(taskData.startDate, taskData.dueDate);

  if (dateError) {
    return dateError;
  }

  return null;
};

const generateTaskCode = async () => {
  const { count, error } = await supabase.from("tasks").select("*", {
    count: "exact",
    head: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  return `TASK-${String((count || 0) + 1).padStart(4, "0")}`;
};

const createActivity = async ({ taskId, userId, type, message }) => {
  const { error } = await supabase.from("task_activities").insert([
    {
      task_id: taskId,
      user_id: userId || null,
      activity_type: type,
      message,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Task activity insert error:", error.message);
  }
};

const uploadFileToStorage = async ({ taskId, file, userId }) => {
  const safeName = file.originalname
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");

  const storagePath = `tasks/${taskId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("task-attachments")
    .upload(storagePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from("task-attachments")
    .getPublicUrl(storagePath);

  const { data: attachment, error: attachmentError } = await supabase
    .from("task_attachments")
    .insert([
      {
        task_id: taskId,
        file_name: file.originalname,
        file_path: storagePath,
        file_url: publicUrlData.publicUrl,
        file_type: file.mimetype,
        file_size: file.size,
        uploaded_by: userId || null,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (attachmentError) {
    await supabase.storage.from("task-attachments").remove([storagePath]);

    throw new Error(attachmentError.message);
  }

  return attachment;
};

const insertDependencies = async ({ taskId, dependencies, userId }) => {
  const dependencyIds = parseArrayField(dependencies)
    .map((id) => String(id).trim())
    .filter(Boolean)
    .filter((id) => id !== String(taskId));

  if (!dependencyIds.length) {
    return [];
  }

  const rows = dependencyIds.map((dependencyTaskId) => ({
    task_id: taskId,
    depends_on_task_id: dependencyTaskId,
    created_by: userId || null,
    created_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from("task_dependencies")
    .insert(rows)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

const getTaskRelations = async (taskId) => {
  const [attachmentsResult, dependenciesResult, activitiesResult] =
    await Promise.all([
      supabase
        .from("task_attachments")
        .select("*")
        .eq("task_id", taskId)
        .order("created_at", { ascending: false }),

      supabase
        .from("task_dependencies")
        .select(
          `
        id,
        depends_on_task_id,
        created_at,
        dependency:tasks!task_dependencies_depends_on_task_id_fkey(
          id,
          task_code,
          title,
          status,
          priority
        )
        `,
        )
        .eq("task_id", taskId),

      supabase
        .from("task_activities")
        .select(
          `
        id,
        activity_type,
        message,
        created_at,
        user:users(
          id,
          first_name,
          last_name,
          designation,
          profile_picture
        )
        `,
        )
        .eq("task_id", taskId)
        .order("created_at", { ascending: false }),
    ]);

  if (attachmentsResult.error) {
    throw new Error(attachmentsResult.error.message);
  }

  if (dependenciesResult.error) {
    throw new Error(dependenciesResult.error.message);
  }

  if (activitiesResult.error) {
    throw new Error(activitiesResult.error.message);
  }

  return {
    attachments: attachmentsResult.data || [],
    dependencies: dependenciesResult.data || [],
    activities: activitiesResult.data || [],
  };
};

/* =========================================================
   Get All Tasks
========================================================= */

exports.getTasks = async ({ filters = {} }) => {
  try {
    let query = supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters.search?.trim()) {
      query = query.ilike("title", `%${filters.search.trim()}%`);
    }

    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    if (filters.priority) {
      query = query.eq("priority", filters.priority);
    }

    if (filters.project) {
      query = query.eq("project_id", filters.project);
    }

    if (filters.module) {
      query = query.eq("module_id", filters.module);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase get tasks error:", error);

      return {
        success: false,
        message: error.message,
        statusCode: 500,
      };
    }

    const formattedTasks = (data || []).map((task) => ({
      ...task,
      startDate: task.start_date,
      dueDate: task.due_date,
      project: task.project_id,
      module: task.module_id,
      assigneeIds: task.assignee_ids || [],
    }));

    return {
      success: true,
      data: formattedTasks,
      tasks: formattedTasks,
    };
  } catch (error) {
    console.error("Get tasks service error:", error);

    return {
      success: false,
      message: error.message || "Unable to fetch tasks",
      statusCode: 500,
    };
  }
};

/* =========================================================
   Get Task By ID
========================================================= */

/* =========================================================
   Get Task By ID
========================================================= */

exports.getTaskById = async ({ taskId, user }) => {
  try {
    let query = supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId);

    if (user?.organization_id) {
      query = query.eq("organization_id", user.organization_id);
    }

    const { data: task, error } = await query.single();

    if (error || !task) {
      console.error("Get task by ID error:", error);

      return errorResult(
        error?.message || "Task not found",
        error?.code === "PGRST116" ? 404 : 500,
      );
    }

    const formattedTask = {
      ...task,
      project: task.project_id,
      module: task.module_id,
      projectName: "WeThink Project",
      moduleName: "Task Management",
      startDate: task.start_date,
      dueDate: task.due_date,
      assigneeIds: task.assignee_ids || [],
      attachments: [],
      dependencies: [],
      activities: [],
    };

    return successResult({
      data: formattedTask,
      task: formattedTask,
    });
  } catch (error) {
    console.error("Get task by ID service error:", error);

    return errorResult(
      error.message || "Unable to fetch task details",
      500,
    );
  }
};

/* =========================================================
   Create Task
========================================================= */

exports.createTask = async ({ taskData, files = [], user }) => {
  try {
    const validationError = validateTaskData(taskData);

    if (validationError) {
      return errorResult(validationError);
    }

    const taskCode = await generateTaskCode();

    const assigneeIds = parseArrayField(
      taskData.assignees || taskData.assigneeIds,
    );

    const { data: task, error } = await supabase
      .from("tasks")
      .insert([
        {
          task_code: taskCode,
          title: taskData.title.trim(),
          description: taskData.description.trim(),
          project_id: taskData.project,
          module_id: taskData.module,
          priority: taskData.priority,
          status: taskData.status,
          start_date: normalizeDate(taskData.startDate),
          due_date: normalizeDate(taskData.dueDate),
          assignee_ids: assigneeIds,
          organization_id: user?.organization_id || null,
          department_id: user?.department_id || null,
          created_by: user?.id || null,
          updated_by: user?.id || null,
          completed_at:
            taskData.status === "Completed" ? new Date().toISOString() : null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return errorResult(error.message);
    }

    const dependencyInput = taskData.dependencies || taskData.dependency;

    if (dependencyInput) {
      await insertDependencies({
        taskId: task.id,
        dependencies: dependencyInput,
        userId: user?.id,
      });
    }

    const uploadedAttachments = [];

    for (const file of files) {
      const attachment = await uploadFileToStorage({
        taskId: task.id,
        file,
        userId: user?.id,
      });

      uploadedAttachments.push(attachment);
    }

    await createActivity({
      taskId: task.id,
      userId: user?.id,
      type: "CREATED",
      message: "Task was created",
    });

    if (assigneeIds.length) {
      await createActivity({
        taskId: task.id,
        userId: user?.id,
        type: "ASSIGNED",
        message: "Task was assigned to employee(s)",
      });
    }

    return successResult({
      message: "Task created successfully",
      task: {
        ...task,
        startDate: task.start_date,
        dueDate: task.due_date,
        attachments: uploadedAttachments,
      },
    });
  } catch (error) {
    return errorResult(error.message, 500);
  }
};

/* =========================================================
   Update Task
========================================================= */

exports.updateTask = async ({ taskId, taskData, files = [], user }) => {
  try {
    const validationError = validateTaskData(taskData, true);

    if (validationError) {
      return errorResult(validationError);
    }

    const { data: existingTask, error: existingError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .single();

    if (existingError || !existingTask) {
      return errorResult("Task not found", 404);
    }

    const updatePayload = {
      updated_by: user?.id || null,
      updated_at: new Date().toISOString(),
    };

    if (taskData.title !== undefined) {
      updatePayload.title = taskData.title.trim();
    }

    if (taskData.description !== undefined) {
      updatePayload.description = taskData.description.trim();
    }

    if (taskData.project !== undefined) {
      updatePayload.project_id = taskData.project;
    }

    if (taskData.module !== undefined) {
      updatePayload.module_id = taskData.module;
    }

    if (taskData.priority !== undefined) {
      updatePayload.priority = taskData.priority;
    }

    if (taskData.status !== undefined) {
      updatePayload.status = taskData.status;
      updatePayload.completed_at =
        taskData.status === "Completed" ? new Date().toISOString() : null;
    }

    if (taskData.startDate !== undefined) {
      updatePayload.start_date = normalizeDate(taskData.startDate);
    }

    if (taskData.dueDate !== undefined) {
      updatePayload.due_date = normalizeDate(taskData.dueDate);
    }

    if (
      taskData.assignees !== undefined ||
      taskData.assigneeIds !== undefined
    ) {
      updatePayload.assignee_ids = parseArrayField(
        taskData.assignees || taskData.assigneeIds,
      );
    }

    const { data: updatedTask, error: updateError } = await supabase
      .from("tasks")
      .update(updatePayload)
      .eq("id", taskId)
      .select()
      .single();

    if (updateError) {
      return errorResult(updateError.message);
    }

    if (
      taskData.dependencies !== undefined ||
      taskData.dependency !== undefined
    ) {
      const { error: deleteDependencyError } = await supabase
        .from("task_dependencies")
        .delete()
        .eq("task_id", taskId);

      if (deleteDependencyError) {
        return errorResult(deleteDependencyError.message);
      }

      await insertDependencies({
        taskId,
        dependencies: taskData.dependencies || taskData.dependency,
        userId: user?.id,
      });
    }

    const uploadedAttachments = [];

    for (const file of files) {
      const attachment = await uploadFileToStorage({
        taskId,
        file,
        userId: user?.id,
      });

      uploadedAttachments.push(attachment);
    }

    await createActivity({
      taskId,
      userId: user?.id,
      type: "UPDATED",
      message: "Task details were updated",
    });

    if (taskData.status && taskData.status !== existingTask.status) {
      await createActivity({
        taskId,
        userId: user?.id,
        type: "STATUS_CHANGED",
        message: `Task status changed from ${existingTask.status} to ${taskData.status}`,
      });
    }

    return successResult({
      message: "Task updated successfully",
      task: {
        ...updatedTask,
        startDate: updatedTask.start_date,
        dueDate: updatedTask.due_date,
        newAttachments: uploadedAttachments,
      },
    });
  } catch (error) {
    return errorResult(error.message, 500);
  }
};

/* =========================================================
   Delete Task
========================================================= */

exports.deleteTask = async ({ taskId, user }) => {
  try {
    const { data: attachments, error: attachmentError } = await supabase
      .from("task_attachments")
      .select("file_path")
      .eq("task_id", taskId);

    if (attachmentError) {
      return errorResult(attachmentError.message);
    }

    const storagePaths = (attachments || [])
      .map((item) => item.file_path)
      .filter(Boolean);

    if (storagePaths.length) {
      await supabase.storage.from("task-attachments").remove(storagePaths);
    }

    await supabase
      .from("task_dependencies")
      .delete()
      .or(`task_id.eq.${taskId},depends_on_task_id.eq.${taskId}`);

    await supabase.from("task_attachments").delete().eq("task_id", taskId);

    await supabase.from("task_activities").delete().eq("task_id", taskId);

    let deleteQuery = supabase.from("tasks").delete().eq("id", taskId);

    if (user?.organization_id) {
      deleteQuery = deleteQuery.eq("organization_id", user.organization_id);
    }

    const { error } = await deleteQuery;

    if (error) {
      return errorResult(error.message);
    }

    return successResult({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return errorResult(error.message, 500);
  }
};

/* =========================================================
   Update Task Status
========================================================= */

exports.updateTaskStatus = async ({ taskId, status, user }) => {
  try {
    if (!ALLOWED_STATUSES.includes(status)) {
      return errorResult("Invalid task status");
    }

    const { data: existingTask, error: existingError } = await supabase
      .from("tasks")
      .select("id,status")
      .eq("id", taskId)
      .single();

    if (existingError || !existingTask) {
      return errorResult("Task not found", 404);
    }

    const { data: task, error } = await supabase
      .from("tasks")
      .update({
        status,
        completed_at: status === "Completed" ? new Date().toISOString() : null,
        updated_by: user?.id || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", taskId)
      .select()
      .single();

    if (error) {
      return errorResult(error.message);
    }

    await createActivity({
      taskId,
      userId: user?.id,
      type: "STATUS_CHANGED",
      message: `Task status changed from ${existingTask.status} to ${status}`,
    });

    return successResult({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    return errorResult(error.message, 500);
  }
};

/* =========================================================
   Complete Task
========================================================= */

exports.completeTask = async ({ taskId, user }) => {
  return exports.updateTaskStatus({
    taskId,
    status: "Completed",
    user,
  });
};

/* =========================================================
   Upload Task Attachments
========================================================= */

exports.uploadTaskAttachments = async ({ taskId, files, user }) => {
  try {
    const { data: task, error: taskError } = await supabase
      .from("tasks")
      .select("id")
      .eq("id", taskId)
      .single();

    if (taskError || !task) {
      return errorResult("Task not found", 404);
    }

    const uploadedAttachments = [];

    for (const file of files) {
      const attachment = await uploadFileToStorage({
        taskId,
        file,
        userId: user?.id,
      });

      uploadedAttachments.push(attachment);
    }

    await createActivity({
      taskId,
      userId: user?.id,
      type: "ATTACHMENT",
      message: `${uploadedAttachments.length} attachment(s) uploaded`,
    });

    return successResult({
      message: "Attachments uploaded successfully",
      attachments: uploadedAttachments,
    });
  } catch (error) {
    return errorResult(error.message, 500);
  }
};

/* =========================================================
   Remove Task Attachment
========================================================= */

exports.removeTaskAttachment = async ({ taskId, attachmentId, user }) => {
  try {
    const { data: attachment, error: findError } = await supabase
      .from("task_attachments")
      .select("*")
      .eq("id", attachmentId)
      .eq("task_id", taskId)
      .single();

    if (findError || !attachment) {
      return errorResult("Attachment not found", 404);
    }

    const { error: storageError } = await supabase.storage
      .from("task-attachments")
      .remove([attachment.file_path]);

    if (storageError) {
      return errorResult(storageError.message);
    }

    const { error: deleteError } = await supabase
      .from("task_attachments")
      .delete()
      .eq("id", attachmentId)
      .eq("task_id", taskId);

    if (deleteError) {
      return errorResult(deleteError.message);
    }

    await createActivity({
      taskId,
      userId: user?.id,
      type: "ATTACHMENT",
      message: `Attachment ${attachment.file_name} removed`,
    });

    return successResult({
      message: "Attachment removed successfully",
    });
  } catch (error) {
    return errorResult(error.message, 500);
  }
};

/* =========================================================
   Get Task Timeline
========================================================= */

exports.getTaskTimeline = async ({ taskId }) => {
  try {
    const { data, error } = await supabase
      .from("task_activities")
      .select(
        `
        id,
        activity_type,
        message,
        created_at,
        user:users(
          id,
          first_name,
          last_name,
          designation,
          profile_picture
        )
        `,
      )
      .eq("task_id", taskId)
      .order("created_at", { ascending: false });

    if (error) {
      return errorResult(error.message);
    }

    const timeline = (data || []).map((activity) => ({
      id: activity.id,
      type: activity.activity_type,
      message: activity.message,
      time: activity.created_at,
      user: activity.user
        ? `${activity.user.first_name || ""} ${activity.user.last_name || ""}`.trim()
        : "System",
      role: activity.user?.designation || "",
      avatar: activity.user?.profile_picture || "",
    }));

    return successResult({
      data: timeline,
      activities: timeline,
      timeline,
    });
  } catch (error) {
    return errorResult(error.message, 500);
  }
};

/* =========================================================
   Get Task Dependencies
========================================================= */

exports.getTaskDependencies = async ({ taskId }) => {
  try {
    const { data, error } = await supabase
      .from("task_dependencies")
      .select(
        `
        id,
        depends_on_task_id,
        created_at,
        dependency:tasks!task_dependencies_depends_on_task_id_fkey(
          id,
          task_code,
          title,
          status,
          priority,
          due_date
        )
        `,
      )
      .eq("task_id", taskId);

    if (error) {
      return errorResult(error.message);
    }

    return successResult({
      data: data || [],
      dependencies: data || [],
    });
  } catch (error) {
    return errorResult(error.message, 500);
  }
};
