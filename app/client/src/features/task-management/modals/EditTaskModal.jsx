import { useEffect, useRef, useState } from "react";
import { X, Calendar, Paperclip } from "lucide-react";
import { updateTask } from "../services/taskService";
import { validateTask } from "../utils/taskValidation";
import "./EditTaskModal.css";

const initialForm = {
  title: "",
  description: "",
  project: "",
  module: "",
  priority: "Medium",
  status: "To Do",
  startDate: "",
  dueDate: "",
  dependency: "",
  attachment: null,
};

// Helper function to format any date into YYYY-MM-DD required by <input type="date">
const formatDateForInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

function EditTaskModal({
  open,
  task,
  onClose,
  onSuccess,
  projects = [],
  modules = [],
  dependencies = [],
}) {
  const modalRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && task) {
      const start = formatDateForInput(
        task.startDate || task.start_date || task.created_at,
      );
      const due = formatDateForInput(task.dueDate || task.due_date);

      setForm({
        title: task.title || "",
        description: task.description || "",
        project: task.project || task.project_id || "",
        module: task.module || task.module_id || "",
        priority: task.priority || "Medium",
        status: task.status || "To Do",
        startDate: start,
        dueDate: due,
        dependency: task.dependency || task.dependency_id || "",
        attachment: null,
      });
      setErrors({});
    }

    if (!open) {
      setForm(initialForm);
      setErrors({});
    }
  }, [open, task]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate due date cannot be set before starting date
    if (name === "dueDate" && form.startDate && value < form.startDate) {
      setErrors((prev) => ({
        ...prev,
        dueDate: "Due date cannot be earlier than starting date",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    setForm((prev) => ({
      ...prev,
      attachment: file,
    }));
  };

  // ✅ ADD THIS HANDLER INSIDE EditTaskModal
  const handleRemoveFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setForm((prev) => ({
      ...prev,
      attachment: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Additional due date validation check before submit
    if (form.dueDate && form.startDate && form.dueDate < form.startDate) {
      setErrors((prev) => ({
        ...prev,
        dueDate: "Due date cannot be earlier than starting date",
      }));
      return;
    }

    const validation = validateTask(form);

    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      setLoading(true);

      const response = await updateTask(task.id, form);

      if (response.success) {
        onSuccess(response.task || response.data);
        onClose();
      }
    } catch (error) {
      console.error("Update task failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-modal-overlay">
      <div className="task-modal" ref={modalRef}>
        <div className="task-modal-header">
          <h2>Edit Task</h2>

          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Task Title</label>

              <input
                type="text"
                name="title"
                placeholder="Enter Task Title"
                value={form.title}
                onChange={handleChange}
              />

              {errors.title && (
                <span className="form-error">{errors.title}</span>
              )}
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                placeholder="Enter Task Description"
                value={form.description}
                onChange={handleChange}
              />

              {errors.description && (
                <span className="form-error">{errors.description}</span>
              )}
            </div>

            <div className="form-group">
              <label>Project</label>

              <select
                name="project"
                value={form.project}
                onChange={handleChange}
              >
                <option value="">Select Project</option>

                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Module</label>

              <select name="module" value={form.module} onChange={handleChange}>
                <option value="">Select Module</option>

                {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>

              <select name="status" value={form.status} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Starting Date - Disabled (Not Editable) */}
            <div className="form-group">
              <label>Starting Date</label>

              <div className="date-field disabled">
                <Calendar size={18} />

                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  disabled
                  readOnly
                />
              </div>

              {errors.startDate && (
                <span className="form-error">{errors.startDate}</span>
              )}
            </div>

            {/* Due Date - Min date set to Starting Date */}
            <div className="form-group">
              <label>Due Date</label>

              <div className="date-field">
                <Calendar size={18} />

                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  min={form.startDate}
                  onChange={handleChange}
                />
              </div>

              {errors.dueDate && (
                <span className="form-error">{errors.dueDate}</span>
              )}
            </div>

            <div className="form-group full-width">
              <label>Dependent Task</label>

              <select
                name="dependency"
                value={form.dependency}
                onChange={handleChange}
              >
                <option value="">No Dependency</option>

                {dependencies.map((dependency) => (
                  <option key={dependency.id} value={dependency.id}>
                    {dependency.title}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ REPLACE ATTACHMENT FIELD WITH THIS */}
            <div className="form-group full-width">
              <label>Attachment</label>

              <div className="attachment-wrapper">
                <label className="attachment-box">
                  <Paperclip size={18} />

                  <span>
                    {form.attachment
                      ? form.attachment.name
                      : task?.attachmentName || "Choose File"}
                  </span>

                  <input type="file" hidden onChange={handleFile} />
                </label>

                {form.attachment && (
                  <button
                    type="button"
                    className="remove-file-btn"
                    onClick={handleRemoveFile}
                    title="Remove selected file"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="task-modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
