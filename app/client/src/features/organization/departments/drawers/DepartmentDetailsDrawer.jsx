import React from "react";
import "../styles/DepartmentDetailsDrawer.css";
import {
  Building2,
  User,
  BadgeCheck,
  Calendar,
  Pencil,
  Trash2,
  Users,
  X,
  CircleUserRound,
} from "lucide-react";


function DepartmentDetailsDrawer({
  open,
  department,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!open || !department) return null;

  return (
    <div className="details-overlay">

      <div className="details-drawer">

        {/* Header */}

        <div className="details-header">

          <div>

            <h2>{department.name}</h2>

            <p>Department Details</p>

          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        {/* Status */}

        <div className="status-box">

          <span
            className={
              department.status === "Active"
                ? "status active"
                : "status inactive"
            }
          >
            {department.status}
          </span>

        </div>

        {/* Information */}

        <div className="info-card">

          <div className="info-row">

            <Building2 size={18} />

            <div>
              <label>Name</label>
              <h4>{department.name}</h4>
            </div>

          </div>

          <div className="info-row">

            <BadgeCheck size={18} />

            <div>
              <label>Department</label>
              <h4>{department.department}</h4>
            </div>

          </div>

          <div className="info-row">

            <User size={18} />

            <div>
              <label>Role</label>
              <h4>{department.role}</h4>
            </div>

          </div>

          <div className="info-row">

            <Calendar size={18} />

            <div>
              <label>Created On</label>
              <h4>{department.createdOn}</h4>
            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="-actions">

  <h3> Quick Actions</h3>

  <button
    className="edit-btn"
    onClick={() => {
      if (onEdit) {
        onEdit(department);
      }
    }}
  >
    <Pencil size={18} />
    Edit Department
  </button>

  <button
    className="team-btn"
    onClick={() =>
  toast.info("Add Team Coming Soon 🚀")
} 
  >
    <Users size={18} />
    Add Team
  </button>

  <button
    className="delete-btn"
    onClick={() => {
      if (window.confirm("Are you sure you want to deactivate this department?")) {
        if (onDelete) {
          onDelete(department);
        }
      }
    }}
  >
    <Trash2 size={18} />
    Deactivate Department
  </button>

</div>

      </div>

    </div>
  );
}

export default DepartmentDetailsDrawer;