import "./ClonePermissionModal.css";

import { useEffect, useState } from "react";

import { X, Copy, User, ShieldCheck } from "lucide-react";

function ClonePermissionModal({
  open,
  employee,
  employees = [],
  onClose,
  onClone,
}) {
  /* ==========================================================
     State
  ========================================================== */

  const [formData, setFormData] = useState({
    sourceEmployee: "",
    copyPermissions: true,
  });

  /* ==========================================================
     Reset Form
  ========================================================== */

  useEffect(() => {
    if (open) {
      setFormData({
        sourceEmployee: "",
        copyPermissions: true,
      });
    }
  }, [open]);

  /* ==========================================================
     Input Change
  ========================================================== */

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ==========================================================
     Submit
  ========================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    onClone(formData);
  };

  /* ==========================================================
     Close
  ========================================================== */

  if (!open) return null;

  return (
    <div className="clone-permission-overlay">
      <div className="clone-permission-modal">
        {/* =========================================
            Header
        ========================================= */}

        <div className="clone-permission-header">
          <div className="clone-title">
            <div className="clone-icon">
              <Copy size={22} />
            </div>

            <div>
              <h2>Clone Permissions</h2>

              <p>Copy permission settings from another employee.</p>
            </div>
          </div>

          <button className="clone-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* =========================================
            Form
        ========================================= */}

        <form onSubmit={handleSubmit} className="clone-permission-form">
          {/* Current Employee */}

          <div className="clone-info-card">
            <div className="info-icon">
              <User size={18} />
            </div>

            <div>
              <label>Selected Employee</label>

              <span>
                {employee?.first_name} {employee?.last_name}
              </span>
            </div>
          </div>

          {/* Source Employee */}

          <div className="clone-field">
            <label>Clone From Employee</label>

            <select
              name="sourceEmployee"
              value={formData.sourceEmployee}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>

              {employees
                .filter((emp) => emp.id !== employee?.id)
                .map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name}
                  </option>
                ))}
            </select>
          </div>

          {/* Copy Switch */}

          <div className="clone-checkbox">
            <input
              type="checkbox"
              id="copyPermissions"
              name="copyPermissions"
              checked={formData.copyPermissions}
              onChange={handleChange}
            />

            <label htmlFor="copyPermissions">
              <ShieldCheck size={18} />
              Copy all permissions exactly
            </label>
          </div>

          {/* Footer */}

          <div className="clone-permission-footer">
            <button
              type="button"
              className="clone-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="clone-save-btn">
              <Copy size={18} />
              Clone Permissions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClonePermissionModal;
