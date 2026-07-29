import "./ResetPermissionConfirmModal.css";
import { AlertTriangle, X, RotateCcw } from "lucide-react";

function ResetPermissionConfirmModal({
  open,
  onClose,
  onConfirm,
  employee,
  loading = false,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="reset-permission-overlay">
      <div className="reset-permission-modal">
        {/* Header */}

        <div className="reset-permission-header">
          <div className="reset-warning-icon">
            <AlertTriangle size={26} />
          </div>

          <button
            className="reset-close-btn"
            onClick={onClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}

        <div className="reset-permission-content">
          <h2>Reset Permissions?</h2>

          <p>You are about to reset permissions for</p>

          <strong>
            {employee?.first_name || ""} {employee?.last_name || ""}
          </strong>

          <p className="reset-description">
            All custom permission changes will be removed and the user's
            permissions will be restored according to the assigned role.
          </p>
        </div>

        {/* Footer */}

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
            <RotateCcw size={17} />

            {loading ? "Resetting..." : "Reset Permissions"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPermissionConfirmModal;