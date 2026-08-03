// Dev - 28/07/26 - Start

import {
  Pencil,
  Users,
  Power,
} from "lucide-react";

import "./DepartmentDetailsDrawer.css";

function DepartmentDetailsDrawer({
  open,
  onClose,
  department,
  onEdit,
  onAddTeam,
  onDeactivate,
}) {
  if (!open || !department) return null;

  return (
    <div className="drawer-overlay">
      <div className="details-drawer">

        {/* ====================================== */}
        {/* Header */}
        {/* ====================================== */}

        <div className="drawer-header">
          <h2>Department Details</h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        {/* ====================================== */}
        {/* Details */}
        {/* ====================================== */}

        <div className="detail-item">
          <label>Department Name</label>
          <p>{department.departmentName}</p>
        </div>

        <div className="detail-item">
          <label>Department Code</label>
          <p>{department.departmentCode}</p>
        </div>

        <div className="detail-item">
          <label>Category</label>
          <p>{department.category}</p>
        </div>

        <div className="detail-item">
          <label>Department Head</label>
          <p>{department.head}</p>
        </div>

        <div className="detail-item">
          <label>Employees</label>
          <p>{department.employees}</p>
        </div>

        <div className="detail-item">
          <label>Status</label>
          <p>{department?.status ? "Active" : "Inactive"}</p>
        </div>

        <div className="detail-item">
          <label>Created On</label>
          <p>{department.createdOn}</p>
        </div>

        {/* ====================================== */}
        {/* Quick Actions */}
        {/* ====================================== */}

        <div className="drawer-actions">

          <button
            className="edit-btn"
            onClick={onEdit}
          >
            <Pencil size={16} />
            Edit Department
          </button>

          <button
            className="team-btn"
            onClick={onAddTeam}
          >
            <Users size={16} />
            Add Team
          </button>

          <button
            className="deactivate-btn"
            onClick={onDeactivate}
          >
            <Power size={16} />

            {department.status === "Active"
              ? "Deactivate Department"
              : "Activate Department"}

          </button>

        </div>

      </div>
    </div>
  );
}

export default DepartmentDetailsDrawer;

// Dev - 28/07/26 - End