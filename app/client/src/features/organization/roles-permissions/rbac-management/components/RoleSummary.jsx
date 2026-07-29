import "./RoleSummary.css";
import {
  ShieldCheck,
  Users,
  Layers,
  CheckCircle2,
  Save,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";

function RoleSummary({ employee, onSavePermission, onResetPermission }) {
  if (!employee) {
    return (
      <div className="role-summary-card">
        <div className="role-summary-header">
          <h3>Role Summary</h3>
          <p>Select an employee to view details.</p>
        </div>

        <div className="role-summary-empty">
          <ShieldCheck size={48} />
          <h4>No Employee Selected</h4>
          <p>Please select an employee from the left panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="role-summary-card">
      {/* Header */}

      <div className="role-summary-header">
        <h3>Role Summary</h3>
        <p>Current employee role information.</p>
      </div>

      {/* Details */}

      <div className="role-summary-body">
        <div className="summary-item">
          <div className="summary-icon">
            <ShieldCheck size={18} />
          </div>

          <div className="summary-content">
            <label>Role</label>
            <span>{employee.role_name}</span>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <Layers size={18} />
          </div>

          <div className="summary-content">
            <label>Hierarchy</label>
            <span>Level {employee.hierarchy_level}</span>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <Users size={18} />
          </div>

          <div className="summary-content">
            <label>Department</label>
            <span>{employee.department_name}</span>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">
            <CheckCircle2 size={18} />
          </div>

          <div className="summary-content">
            <label>Status</label>

            <span
              className={
                employee.status ? "role-status active" : "role-status inactive"
              }
            >
              {employee.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}

      <div className="role-summary-actions">
        <button className="summary-save-btn" onClick={onSavePermission}>
          <Save size={18} />
          Save Permission
        </button>

        <button className="summary-reset-btn" onClick={onResetPermission}>
          <RotateCcw size={18} />
          Reset Permission
        </button>
      </div>

      {/* Warning */}

      <div className="role-summary-warning">
        <AlertTriangle size={18} />

        <p>
          Resetting permissions restores the employee's default role
          permissions. Custom permissions will be removed permanently.
        </p>
      </div>
    </div>
  );
}

export default RoleSummary;
