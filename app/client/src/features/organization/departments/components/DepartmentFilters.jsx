// Deepak - 28/07/2026 - Start

import "./DepartmentFilters.css";
import { Search, ChevronDown } from "lucide-react";

function DepartmentFilters({
  search,
  setSearch,
  status,
  setStatus,
  category,
  setCategory,
  sortBy,
  setSortBy,
  handleReset,
}) {
  return (
    <div className="department-filters">
      {/* Search */}
      <div className="department-filter-search">
        <Search size={18} strokeWidth={2} />

        <input
          type="text"
          placeholder="Search Department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status */}
      <div className="department-filter-item">
        <div className="department-filter-select-wrapper">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <ChevronDown
            className="department-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Category */}
      <div className="department-filter-item">
        <div className="department-filter-select-wrapper">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            <option value="IT">Information Technology</option>

            <option value="Test">Testing Department</option>

            <option value="Web">Web</option>

            <option value="Full Stack">Full-Stack</option>

            <option value="MERN">MERN Stack</option>

            <option value="MEAN">MEAN Stack</option>

            <option value="UI/UX">UI/UX</option>

            <option value="AI/ML">AI/ML</option>

            <option value="Marketing">Marketing</option>

            <option value="Design">Design</option>
          </select>

          <ChevronDown
            className="department-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Sort */}
      <div className="department-filter-item">
        <div className="department-filter-select-wrapper">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>

          <ChevronDown
            className="department-filter-dropdown-icon"
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Reset */}
      <button
        type="button"
        className="department-filter-reset-btn"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default DepartmentFilters;

// Deepak - 28/07/2026 - End
