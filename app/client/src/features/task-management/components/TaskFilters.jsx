import { useEffect, useState } from "react";
import { Search, RotateCcw, ChevronDown } from "lucide-react";

import "./TaskFilters.css";

function TaskFilters({
  filters,
  setFilters,
  projects = [],
  assignees = [],
  totalTasks = 0,
  onReset,
}) {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  /* =========================================================
     Debounced Search
  ========================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchValue,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, setFilters]);

  /* =========================================================
     Dropdown Change
  ========================================================= */

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================================================
     Reset Filters
  ========================================================= */

  const handleReset = () => {
    setSearchValue("");

    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="task-filters">
      {/* Search */}
      <div className="task-filter-search">
        <Search size={18} strokeWidth={2} />

        <input
          type="text"
          placeholder="Search by task name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Status */}
      <div className="task-filter-item">
        <div className="task-filter-select-wrapper">
          <select
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>

          <ChevronDown
            className="task-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Priority */}
      <div className="task-filter-item">
        <div className="task-filter-select-wrapper">
          <select
            value={filters.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <ChevronDown
            className="task-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Assignee */}
      <div className="task-filter-item">
        <div className="task-filter-select-wrapper">
          <select
            value={filters.assignee}
            onChange={(e) => handleChange("assignee", e.target.value)}
          >
            <option value="">All Assignee</option>

            {assignees.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>

          <ChevronDown
            className="task-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Project */}
      <div className="task-filter-item">
        <div className="task-filter-select-wrapper">
          <select
            value={filters.project}
            onChange={(e) => handleChange("project", e.target.value)}
          >
            <option value="">All Project</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.project_name}
              </option>
            ))}
          </select>

          <ChevronDown
            className="task-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Reset */}
      <button
        type="button"
        className="task-filter-reset-btn"
        onClick={handleReset}
      >
        <RotateCcw size={16} />
        <span>Reset</span>
      </button>

      {/* Total Tasks */}
      <div className="task-filter-total">
        <span>Total Tasks:</span>
        <strong>{totalTasks}</strong>
      </div>
    </div>
  );
}

export default TaskFilters;
