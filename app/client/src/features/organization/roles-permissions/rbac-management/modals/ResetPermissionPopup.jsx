import "./ResetPermissionPopup.css";

import { AlertTriangle, RotateCcw, X } from "lucide-react";

function ResetPermissionPopup({
  open,
  employee,
  onClose,
  onConfirm,
  loading = false,
}) {
  /* ==========================================================
     Close Popup
  ========================================================== */

  if (!open) return null;

  return (
    <div className="reset-permission-overlay">
      <div className="reset-permission-popup">
        {/* =========================================
            Header
        ========================================= */}

        <div className="reset-permission-header">
          <div className="reset-warning-icon">
            <AlertTriangle size={28} />
          </div>

          <button className="reset-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* =========================================
            Content
        ========================================= */}

        <div className="reset-permission-content">
          <h2>Reset Permissions?</h2>

          <p>
            You are about to reset all custom permissions for the following
            employee.
          </p>

          <div className="reset-employee-card">
            <div className="reset-avatar">
              {employee?.first_name?.charAt(0)}
            </div>

            <div>
              <h4>
                {employee?.first_name} {employee?.last_name}
              </h4>

              <span>{employee?.role_name}</span>
            </div>
          </div>

          <div className="reset-warning-box">
            <AlertTriangle size={18} />

            <p>
              This employee will immediately lose every custom permission and
              return to the default permissions of the assigned role.
            </p>
          </div>
        </div>

        {/* =========================================
            Footer
        ========================================= */}

        <div className="reset-permission-footer">
          <button
            className="reset-cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="reset-confirm-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            <RotateCcw size={18} />

            {loading ? "Resetting..." : "Reset Permissions"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPermissionPopup;
