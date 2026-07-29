import "./RoleFilters.css";
import { RotateCcw, Search } from "lucide-react";

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

      <div className="role-search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status */}

      <div className="role-filter-group">
        <label>Status</label>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Hierarchy */}

      <div className="role-filter-group">
        <label>Hierarchy</label>

        <select
          value={hierarchy}
          onChange={(e) => setHierarchy(e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
        </select>
      </div>

      {/* Reset */}

      <button className="role-filter-reset" onClick={onReset}>
        <RotateCcw size={18} />
        Reset Filters
      </button>
    </div>
  );
}

export default RoleFilters;
