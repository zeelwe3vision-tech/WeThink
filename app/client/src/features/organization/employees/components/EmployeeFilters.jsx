import { Search } from "lucide-react";
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
      {/* Search */}

      <div className="filter-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status */}

      <div className="filter-item">
        <label>Status</label>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>
      </div>

      {/* Department */}

      <div className="filter-item">
        <label>Department</label>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option>All Department</option>
          <option>IT</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Sales</option>
        </select>
      </div>

      {/* Sort */}

      <div className="filter-item">
        <label>Sort By</label>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>Newest</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

      {/* Reset */}

      <button className="reset-btn" onClick={onReset}>
        Reset
      </button>

      {/* Apply */}

      <button className="apply-btn">Apply</button>
    </div>
  );
}

export default EmployeeFilters;
