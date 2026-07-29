import "./PermissionHeader.css";
import { Users, RotateCcw } from "lucide-react";

function PermissionHeader({
  employees,
  selectedEmployee,
  onSelectEmployee,
  onResetPermission,
}) {
  return (
    <>
      {/* Page Header */}

      <div className="permission-page-header">
        <h1 className="permission-title">RBAC Management</h1>

        <p className="permission-subtitle">
          Manage custom employee permissions while keeping role-based defaults.
        </p>
      </div>

      {/* Employee Selection Card */}

      <div className="employee-selection-card">
        <label className="selection-label">Select Employee</label>

        <div className="employee-selection-body">
          <div className="permission-employee-selector">
            <Users size={18} />

            <select
              value={selectedEmployee?.id || ""}
              onChange={(e) => onSelectEmployee(e.target.value)}
            >
              <option value="">Select Employee</option>

              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.first_name} {employee.last_name}
                  {" ("}
                  {employee.employee_code}
                  {")"}
                </option>
              ))}
            </select>
          </div>

          <button
            className="permission-reset-btn"
            disabled={!selectedEmployee}
            onClick={onResetPermission}
          >
            <RotateCcw size={18} />
            Reset Permission
          </button>
        </div>
      </div>
    </>
  );
}

export default PermissionHeader;
