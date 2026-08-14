import { Search, ChevronDown } from "lucide-react";
import "./EmployeeFilters.css";

function EmployeeFilters({
  search,
  setSearch,
  status,
  setStatus,
  department,
  setDepartment,
  sortBy,
  setSortBy,
  onReset,
}) {
  return (
    <div className="employee-filters">
      {/* Search Bar */}
      <div className="employee-filter-search">
        <Search size={18} strokeWidth={2} />

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status Select */}
      <div className="employee-filter-item">
        <div className="employee-filter-select-wrapper">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All Status</option>

            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>

            <option value="On Leave">On Leave</option>
          </select>

          <ChevronDown
            className="employee-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Department Select */}
      <div className="employee-filter-item">
        <div className="employee-filter-select-wrapper">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Department</option>

            <option value="IT">IT</option>

            <option value="HR">HR</option>

            <option value="Finance">Finance</option>

            <option value="Sales">Sales</option>
          </select>

          <ChevronDown
            className="employee-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Sort Select */}
      <div className="employee-filter-item">
        <div className="employee-filter-select-wrapper">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Newest">Newest</option>

            <option value="A-Z">A-Z</option>

            <option value="Z-A">Z-A</option>
          </select>

          <ChevronDown
            className="employee-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        type="button"
        className="employee-filter-reset-btn"
        onClick={onReset}
      >
        Reset
      </button>

      {/* Apply Button */}
      <button type="button" className="employee-filter-apply-btn">
        Apply
      </button>
    </div>
  );
}

export default EmployeeFilters;