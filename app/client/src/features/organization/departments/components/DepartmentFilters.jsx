// Deepak - 28/07/2026 - Start

import "./DepartmentFilters.css";
import { Search, RotateCcw, Filter } from "lucide-react";

function DepartmentFilters({
  search,
  setSearch,
  status,
  setStatus,
  category,
  setCategory,
  sortBy,
  setSortBy,
  handleReset
}) {
  // ======================================
  // Reset Filters
  // ======================================

  return (
    <div className="department-filters">
      {/* ====================================== */}
      {/* Search */}
      {/* ====================================== */}

      <div className="filter-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search Department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ====================================== */}
      {/* Status */}
      {/* ====================================== */}

      <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="">All Status</option>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
</select>

      {/* ====================================== */}
      {/* Category */}
      {/* ====================================== */}

      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">All Categories</option>

  <option value="IT">
    Information Technology
  </option>

  <option value="Test">
    Testing Department
  </option>

  <option value="Web">
    Web
  </option>

  <option value="Full Stack">
    Full-Stack
  </option>

  <option value="MERN">
    MERN Stack
  </option>

  <option value="MEAN">
    MEAN Stack
  </option>

  <option value="UI/UX">
    UI/UX
  </option>

  <option value="AI/ML">
    AI/ML
  </option>

  <option value="Marketing">
    Marketing
  </option>

  <option value="Design">
    Design
  </option>
</select>

      {/* ====================================== */}
      {/* Sort */}
      {/* ====================================== */}

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="az">A - Z</option>
        <option value="za">Z - A</option>
      </select>

      <button
        className="reset-btn"
        onClick={handleReset}
        >
        Reset
      </button>
    </div>
  );
}
export default DepartmentFilters;

// Deepak - 28/07/2026 - End