import "./RoleFilters.css";
import { RotateCcw, Search, ChevronDown } from "lucide-react";

function RoleFilters({
  search,
  setSearch,
  status,
  setStatus,
  hierarchy,
  setHierarchy,
  onReset,
}) {
  return (
    <div className="role-filters">
      {/* Search */}
      <div className="role-filter-search">
        <Search size={18} strokeWidth={2} />

        <input
          type="text"
          placeholder="Search role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status */}
      <div className="role-filter-item">
        <div className="role-filter-select-wrapper">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <ChevronDown
            className="role-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Hierarchy */}
      <div className="role-filter-item">
        <div className="role-filter-select-wrapper">
          <select
            value={hierarchy}
            onChange={(e) => setHierarchy(e.target.value)}
          >
            <option value="All">All Levels</option>
            <option value="1">Level 1 - CEO</option>
            <option value="2">Level 2 - HR</option>
            <option value="3">Level 3 - Admin</option>
            <option value="4">Level 4 - Manager</option>
            <option value="5">Level 5 - Team Leader</option>
            <option value="6">Level 6 - Employee</option>
          </select>

          <ChevronDown
            className="role-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Reset */}
      <button type="button" className="role-filter-reset-btn" onClick={onReset}>
        <RotateCcw size={18} />
        Reset Filters
      </button>
    </div>
  );
}
export default RoleFilters;
