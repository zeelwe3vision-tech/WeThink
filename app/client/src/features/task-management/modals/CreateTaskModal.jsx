import { useEffect, useRef, useState } from "react";
import {
  X,
  Calendar,
  Paperclip,
} from "lucide-react";
import { createTask } from "../services/taskService";
import { validateTask } from "../utils/taskValidation";
import "./CreateTaskModal.css";

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

function CreateTaskModal({
  open,
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
    if (!open) {
      setForm(initialForm);
      setErrors({});
    }
  }, [open]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateTask(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.error("Task validation failed:", validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const taskData = {
        title: form.title.trim(),
        description: form.description.trim(),
        project: form.project,
        module: form.module,
        priority: form.priority,
        status: form.status,
        startDate: form.startDate,
        dueDate: form.dueDate,
        dependencies: form.dependency ? [form.dependency] : [],
        attachments: form.attachment ? [form.attachment] : [],
      };

      console.log("Creating task:", taskData);

      const response = await createTask(taskData);

      console.log("Create task response:", response);

      if (!response?.success) {
        throw new Error(response?.message || "Task creation failed");
      }

      setForm(initialForm);
      setErrors({});

      if (onSuccess) {
        await onSuccess(response.task || response.data);
      }

      onClose();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to create task";

      console.error("Create task failed:", error.response?.data || error);

      setErrors((previous) => ({
        ...previous,
        submit: message,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-modal-overlay">
      <div className="task-modal" ref={modalRef}>
        <div className="task-modal-header">
          <h2>Create Task</h2>

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

              {errors.project && (
                <span className="form-error">{errors.project}</span>
              )}
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

              {errors.module && (
                <span className="form-error">{errors.module}</span>
              )}
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

            <div className="form-group">
              <label>Starting Date</label>

              <div className="date-field">
                <Calendar size={18} />

                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>

              {errors.startDate && (
                <span className="form-error">{errors.startDate}</span>
              )}
            </div>

            <div className="form-group">
              <label>Due Date</label>

              <div className="date-field">
                <Calendar size={18} />

                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
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

                {dependencies.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Attachment</label>

              <label className="attachment-box">
                <Paperclip size={18} />

                <span>
                  {form.attachment ? form.attachment.name : "Choose File"}
                </span>

                <input type="file" hidden onChange={handleFile} />
              </label>
            </div>
          </div>

          {errors.submit && (
            <div className="task-submit-error">{errors.submit}</div>
          )}

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
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;