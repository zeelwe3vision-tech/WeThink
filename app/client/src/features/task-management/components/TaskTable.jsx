import { Eye, Trash2 } from "lucide-react";
import "./TaskTable.css";

function TaskTable({
  tasks = [],
  loading = false,
  onView,
  onDelete,
  onCreateTask,
}) {

  const formatDate = (dateValue) => {
    if (!dateValue) return "No Due Date";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status = "") => {
    return status.replace(/\s+/g, "").toLowerCase();
  };

  if (loading) {
    return <div className="task-table-loading">Loading Tasks...</div>;
  }

  if (!tasks.length) {
    return (
      <div className="task-empty-state">
        <div className="task-empty-icon">📋</div>
        <h3>No Tasks Found</h3>
        <p>Create your first task to start managing your team's work.</p>
        <button
          type="button"
          className="create-task-btn"
          onClick={onCreateTask}
        >
          Create Task
        </button>
      </div>
    );
  }

  return (
    <div className="task-table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Assignee</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Project</th>
            <th className="action-column">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => {
            const taskTitle = task.title || "Untitled Task";
            const moduleName =
              task.moduleName ||
              task.module_name ||
              task.module?.module_name ||
              task.module?.name ||
              "No Module";

            const projectName =
              task.projectName ||
              task.project_name ||
              task.project?.project_name ||
              task.project?.name ||
              "No Project";

            const assigneeName =
              task.assigneeName ||
              task.assignee_name ||
              task.assignee?.name ||
              task.assignee?.first_name ||
              "Unassigned";

            const assigneeAvatar =
              task.assigneeAvatar ||
              task.assignee_avatar ||
              task.assignee?.profile_picture ||
              "";

            const dueDate = task.dueDate || task.due_date;

            return (
              <tr key={task.id}>
                <td className="task-name">
                  <div className="task-title">{taskTitle}</div>
                  <div className="task-module">{moduleName}</div>
                </td>

                <td>
                  <div className="task-assignee">
                    {assigneeAvatar ? (
                      <img src={assigneeAvatar} alt={assigneeName} />
                    ) : (
                      <div className="assignee-avatar">
                        {assigneeName.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <span>{assigneeName}</span>
                  </div>
                </td>

                <td>
                  <span
                    className={`priority-badge priority-${(
                      task.priority || "medium"
                    ).toLowerCase()}`}
                  >
                    {task.priority || "Medium"}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge status-${getStatusClass(
                      task.status || "To Do",
                    )}`}
                  >
                    {task.status || "To Do"}
                  </span>
                </td>

                <td>{formatDate(dueDate)}</td>

                <td>{projectName}</td>

                <td className="action-column">
                  <button
                    type="button"
                    className="view-btn"
                    onClick={() => onView?.(task)}
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => onDelete?.(task)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default TaskTable;
