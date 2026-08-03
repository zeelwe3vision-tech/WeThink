import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  Download,
  Eye,
  File,
  Flag,
  List,
  Pencil,
  Trash2,
} from "lucide-react";

import ActivityTimeline from "../components/ActivityTimeline";
import EditTaskModal from "../modals/EditTaskModal";
import {
  deleteTask,
  getDependencies,
  getTaskById,
  getTaskTimeline,
} from "../services/taskService";
import "./TaskDetails.css";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [activities, setActivities] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timelineLoading, setTimelineLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const loadTask = useCallback(async () => {
    try {
      setLoading(true);
      setTimelineLoading(true);
      setError("");

      const taskResponse = await getTaskById(id);

      if (!taskResponse?.success) {
        throw new Error(taskResponse?.message || "Task not found");
      }

      const taskData = taskResponse.task || taskResponse.data;

      if (!taskData) {
        throw new Error("Task not found");
      }

      setTask(taskData);

      try {
        const timelineResponse = await getTaskTimeline(id);

        setActivities(
          timelineResponse?.activities ||
            timelineResponse?.timeline ||
            timelineResponse?.data ||
            taskData.activities ||
            [],
        );
      } catch (timelineError) {
        console.error(
          "Task timeline loading failed:",
          timelineError.response?.data || timelineError,
        );
        setActivities(taskData.activities || []);
      }

      try {
        const dependencyResponse = await getDependencies(id);

        setDependencies(
          dependencyResponse?.dependencies ||
            dependencyResponse?.data ||
            taskData.dependencies ||
            [],
        );
      } catch (dependencyError) {
        console.error(
          "Task dependencies loading failed:",
          dependencyError.response?.data || dependencyError,
        );
        setDependencies(taskData.dependencies || []);
      }
    } catch (requestError) {
      console.error(
        "Task details loading failed:",
        requestError.response?.data || requestError,
      );

      setTask(null);
      setActivities([]);
      setDependencies([]);
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Task not found",
      );
    } finally {
      setLoading(false);
      setTimelineLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  const formatDate = (value, includeTime = false) => {
    if (!value) return "Not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      ...(includeTime
        ? {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        : {}),
    });
  };

  const completion = useMemo(() => {
    const value =
      task?.completion_percentage ??
      task?.completion ??
      task?.progress ??
      (task?.status === "Completed" ? 100 : 0);

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) return 0;

    return Math.min(100, Math.max(0, numericValue));
  }, [task]);

  const projectName =
    task?.projectName ||
    task?.project_name ||
    task?.project?.project_name ||
    task?.project?.name ||
    "WeThink Project";

  const moduleName =
    task?.moduleName ||
    task?.module_name ||
    task?.module?.module_name ||
    task?.module?.name ||
    "Task Management";

  const taskCode =
    task?.task_code ||
    task?.taskCode ||
    task?.code ||
    `TASK-${String(task?.id || "")
      .slice(0, 4)
      .toUpperCase()}`;

  const createdByName =
    task?.creatorName ||
    task?.created_by_name ||
    task?.creator?.name ||
    `${task?.creator?.first_name || ""} ${
      task?.creator?.last_name || ""
    }`.trim() ||
    "System";

  const updatedByName =
    task?.updatedByName ||
    task?.updated_by_name ||
    task?.updater?.name ||
    `${task?.updater?.first_name || ""} ${
      task?.updater?.last_name || ""
    }`.trim() ||
    createdByName;

  const attachments = task?.attachments || [];

  const editProjects = [
    {
      id: task?.project_id || task?.projectId || task?.project,
      name: projectName,
    },
  ].filter((item) => item.id);

  const editModules = [
    {
      id: task?.module_id || task?.moduleId || task?.module,
      name: moduleName,
    },
  ].filter((item) => item.id);

  const getDependencyTask = (item) => item?.dependency || item?.task || item;

  const getFileBadge = (attachment) => {
    const name = attachment.file_name || attachment.name || "";
    const ext = name.split(".").pop()?.toUpperCase() || "FILE";

    if (ext === "FIG" || ext === "FIGMA") {
      return <div className="file-badge fig">FIG</div>;
    }
    if (ext === "PDF") {
      return <div className="file-badge pdf">PDF</div>;
    }
    if (["PNG", "JPG", "JPEG", "WEBP", "SVG"].includes(ext)) {
      return <div className="file-badge png">{ext}</div>;
    }

    return (
      <div className="file-badge default">
        <File size={16} />
      </div>
    );
  };

  const handleAttachmentOpen = (attachment) => {
    const url =
      attachment.file_url ||
      attachment.url ||
      attachment.public_url ||
      attachment.path;

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleDownloadAll = () => {
    attachments.forEach((attachment) => {
      const url =
        attachment.file_url ||
        attachment.url ||
        attachment.public_url ||
        attachment.path;

      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const response = await deleteTask(id);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to delete task");
      }

      navigate("/tasks", { replace: true });
    } catch (deleteError) {
      console.error(
        "Delete task failed:",
        deleteError.response?.data || deleteError,
      );

      setError(
        deleteError.response?.data?.message ||
          deleteError.message ||
          "Unable to delete task",
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateSuccess = async () => {
    setEditOpen(false);
    await loadTask();
  };

  if (loading) {
    return (
      <div className="task-details-loading">
        <div className="task-details-loader"></div>
        <span>Loading task details...</span>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="task-details-empty">
        <h2>Task Not Found</h2>
        <p>{error || "The requested task could not be found."}</p>
        <button type="button" onClick={() => navigate("/tasks")}>
          Back to Task List
        </button>
      </div>
    );
  }

  return (
    <div className="task-details-page">
      {/* Header */}
      <div className="task-details-header">
        <div className="task-title-group">
          <h1>Task Details</h1>
          <span className="task-code-badge">{taskCode}</span>
        </div>

        <button
          type="button"
          className="edit-task-btn"
          onClick={() => setEditOpen(true)}
        >
          <Pencil size={16} />
          Edit Task
        </button>
      </div>

      {/* Top Status Strip */}
      <div className="task-status-strip">
        <div className="status-strip-card">
          <span className="status-dot"></span>
          <span>{task.status || "In Progress"}</span>
        </div>

        <div className="status-strip-card">
          <Flag size={16} className="flag-icon" />
          <span>{task.priority || "High"} Priority</span>
        </div>

        <div className="status-strip-card">
          <CalendarDays size={16} />
          <span>Start: {formatDate(task.startDate || task.start_date)}</span>
        </div>

        <div className="status-strip-card">
          <CalendarDays size={16} />
          <span>Due: {formatDate(task.dueDate || task.due_date)}</span>
        </div>

        <div className="status-strip-card progress-card">
          <span>{completion}% Complete</span>
          <div className="strip-progress-track">
            <span style={{ width: `${completion}%` }}></span>
          </div>
        </div>
      </div>

      {error && <div className="task-details-error">{error}</div>}

      {/* Main Grid Layout */}
      <div className="task-details-layout">
        {/* Left Column */}
        <div className="task-details-main">
          {/* Description */}
          <section className="task-card">
            <h2>Description</h2>
            <p>{task.description || "No task description available."}</p>
          </section>

          {/* 2-Column Attachments & Dependencies Grid */}
          <div className="task-resource-grid">
            {/* Attachments Card */}
            <section className="task-card">
              <div className="task-card-header">
                <h2>Attachments ({attachments.length})</h2>
                {attachments.length > 0 && (
                  <button
                    type="button"
                    className="card-header-btn"
                    onClick={handleDownloadAll}
                  >
                    <Download size={15} />
                    Download All
                  </button>
                )}
              </div>

              <div className="attachment-list">
                {attachments.length > 0 ? (
                  attachments.map((attachment) => {
                    const attachmentName =
                      attachment.file_name || attachment.name || "Attachment";

                    const attachmentSize =
                      attachment.file_size || attachment.size || "";

                    return (
                      <div
                        className="attachment-item"
                        key={attachment.id || attachmentName}
                      >
                        <div className="attachment-left">
                          {getFileBadge(attachment)}
                          <div className="attachment-info">
                            <strong>{attachmentName}</strong>
                            <span>
                              {attachmentSize ? `${attachmentSize} • ` : ""}
                              {formatDate(
                                attachment.uploaded_at || task.created_at,
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="attachment-actions">
                          <button
                            type="button"
                            aria-label={`Download ${attachmentName}`}
                            onClick={() => handleAttachmentOpen(attachment)}
                          >
                            <Download size={16} />
                          </button>
                          <button
                            type="button"
                            aria-label={`View ${attachmentName}`}
                            onClick={() => handleAttachmentOpen(attachment)}
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="task-section-empty">
                    No attachments available.
                  </div>
                )}
              </div>
            </section>

            {/* Dependencies Card */}
            <section className="task-card">
              <div className="task-card-header">
                <h2>Dependencies ({dependencies.length})</h2>
                <button type="button" className="card-header-link">
                  View all dependencies <ChevronRight size={14} />
                </button>
              </div>

              <div className="dependency-list">
                {dependencies.length > 0 ? (
                  dependencies.map((item) => {
                    const dependency = getDependencyTask(item);
                    const statusClass = (dependency.status || "To Do")
                      .replace(/\s+/g, "")
                      .toLowerCase();

                    return (
                      <div
                        className="dependency-item"
                        key={item.id || dependency.id}
                      >
                        <div className="dependency-left">
                          <div className="dependency-icon">
                            <List size={18} />
                          </div>
                          <div className="dependency-info">
                            <span>
                              {dependency.task_code ||
                                dependency.taskCode ||
                                "TASK-0000"}
                            </span>
                            <strong>
                              {dependency.title || "Dependent Task"}
                            </strong>
                          </div>
                        </div>

                        <span
                          className={`dependency-status dependency-status-${statusClass}`}
                        >
                          {dependency.status || "To Do"}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="task-section-empty">
                    No task dependencies.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Activity Timeline */}
          <ActivityTimeline activities={activities} loading={timelineLoading} />
        </div>

        {/* Right Sidebar Column */}
        <aside className="task-details-sidebar">
          {/* Summary Panel */}
          <section className="task-card summary-card">
            <div className="summary-row">
              <span>Task ID</span>
              <span className="task-code-badge">{taskCode}</span>
            </div>

            <div className="summary-row">
              <span>Status</span>
              <div className="summary-value-group">
                <span className="status-dot"></span>
                <strong>{task.status || "In Progress"}</strong>
              </div>
            </div>

            <div className="summary-row">
              <span>Priority</span>
              <div className="summary-value-group">
                <Flag size={15} className="flag-icon" />
                <strong>{task.priority || "High"}</strong>
              </div>
            </div>

            <div className="summary-row">
              <span>Project</span>
              <strong>{projectName}</strong>
            </div>

            <div className="summary-row">
              <span>Module</span>
              <strong>{moduleName}</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Start Date</span>
              <div className="summary-value-group">
                <CalendarDays size={15} />
                <strong>{formatDate(task.startDate || task.start_date)}</strong>
              </div>
            </div>

            <div className="summary-row">
              <span>Due Date</span>
              <div className="summary-value-group">
                <CalendarDays size={15} />
                <strong>{formatDate(task.dueDate || task.due_date)}</strong>
              </div>
            </div>

            <div className="summary-row summary-progress-row">
              <span>Completion</span>
              <div className="summary-progress-wrapper">
                <div className="summary-progress-track">
                  <span style={{ width: `${completion}%` }}></span>
                </div>
                <strong>{completion}%</strong>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-user">
              <span>Created By</span>
              <div className="summary-user-info">
                <div className="summary-avatar">
                  {createdByName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong>{createdByName}</strong>
                  <small>{formatDate(task.created_at, true)}</small>
                </div>
              </div>
            </div>

            <div className="summary-user">
              <span>Last Updated</span>
              <div className="summary-user-info">
                <div className="summary-avatar">
                  {updatedByName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <strong>{updatedByName}</strong>
                  <small>{formatDate(task.updated_at, true)}</small>
                </div>
              </div>
            </div>
          </section>

          {/* Actions Panel */}
          <section className="task-card task-actions-card">
            <h2>Actions</h2>

            <button
              type="button"
              className="delete-task-btn"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 size={16} />
              {deleting ? "Deleting..." : "Delete Task"}
            </button>
          </section>
        </aside>
      </div>

      <EditTaskModal
        open={editOpen}
        task={task}
        onClose={() => setEditOpen(false)}
        onSuccess={handleUpdateSuccess}
        projects={editProjects}
        modules={editModules}
        dependencies={dependencies
          .map((item) => getDependencyTask(item))
          .filter((item) => item?.id !== task.id)}
      />
    </div>
  );
}

export default TaskDetails;
