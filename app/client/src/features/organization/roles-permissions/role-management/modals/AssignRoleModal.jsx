// Chetan - Assign Role Modal

import { useState } from "react";
import "./AssignRoleModal.css";

import { X, User, Shield, Calendar, Bell } from "lucide-react";

function AssignRoleModal({ open, employee, roles, onClose, onAssign }) {
  const [roleId, setRoleId] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [reason, setReason] = useState("");
  const [notifyEmployee, setNotifyEmployee] = useState(true);

  if (!open) return null;

  const handleSubmit = () => {
    onAssign({
      employeeId: employee.id,
      roleId,
      effectiveDate,
      reason,
      notifyEmployee,
    });
  };

  return (
    <div className="assign-role-overlay">
      <div className="assign-role-modal">
        {/* Header */}

        <div className="assign-role-header">
          <div className="assign-role-title">
            <Shield size={22} />

            <div>
              <h2>Assign Role</h2>

              <p>Assign a new role to this employee.</p>
            </div>
          </div>

          <button className="assign-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="assign-role-body">
          <div className="employee-card">
            <User size={22} />

            <div>
              <strong>{employee?.full_name}</strong>

              <span>{employee?.designation}</span>
            </div>
          </div>

          <div className="assign-form-group">
            <label>Current Role</label>

            <input type="text" value={employee?.role || ""} disabled />
          </div>

          <div className="assign-form-group">
            <label>New Role *</label>

            <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
              <option value="">Select Role</option>

              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>

          <div className="assign-form-group">
            <label>
              <Calendar size={16} />
              Effective Date
            </label>

            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
            />
          </div>

          <div className="assign-form-group">
            <label>Reason</label>

            <textarea
              rows="4"
              placeholder="Reason for role assignment..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <label className="notify-switch">
            <input
              type="checkbox"
              checked={notifyEmployee}
              onChange={(e) => setNotifyEmployee(e.target.checked)}
            />
            <span className="notify-checkbox">
              <Bell size={14} />
            </span>
            Notify employee via email
          </label>
        </div>

        {/* Footer */}

        <div className="assign-role-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="assign-btn" onClick={handleSubmit}>
            Assign Role
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignRoleModal;
