// Chetan - Create Role Modal

import { useState } from "react";
import "./CreateRoleModal.css";

import {
  X,
  Shield,
  Layers,
  Building2,
  LayoutDashboard,
  Globe,
  Smartphone,
  Server,
  Check,
} from "lucide-react";

function CreateRoleModal({ open, onClose, onSave, role = null }) {
  const isEdit = !!role;

  const [formData, setFormData] = useState({
    roleName: role?.roleName || "",
    roleCode: role?.roleCode || "",
    hierarchy: role?.hierarchy || "",
    parentRole: role?.parentRole || "",
    dashboard: role?.dashboard || "",
    description: role?.description || "",
    status: role?.status ?? true,
    webAccess: role?.webAccess ?? true,
    mobileAccess: role?.mobileAccess ?? false,
    apiAccess: role?.apiAccess ?? false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="role-modal-overlay">
      <div className="role-modal">
        {/* Header */}

        <div className="role-modal-header">
          <div className="role-modal-title">
            <Shield size={22} />

            <div>
              <h2>{isEdit ? "Edit Role" : "Create New Role"}</h2>

              <p>Configure role information for your organization.</p>
            </div>
          </div>

          <button className="role-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="role-modal-body">
          {/* Left Section */}

          <div className="role-form-section">
            <div className="role-section-title">
              <Layers size={18} />
              Basic Information
            </div>

            {/* Role Name */}

            <div className="role-form-group">
              <label>Role Name *</label>

              <input
                type="text"
                placeholder="Enter role name"
                value={formData.roleName}
                onChange={(e) => handleChange("roleName", e.target.value)}
              />
            </div>

            {/* Role Code */}

            <div className="role-form-group">
              <label>Role Code *</label>

              <input
                type="text"
                placeholder="Example : HR_MANAGER"
                value={formData.roleCode}
                onChange={(e) => handleChange("roleCode", e.target.value)}
              />
            </div>

            {/* Hierarchy */}

            <div className="role-form-group">
              <label>
                <Building2 size={16} />
                Hierarchy Level
              </label>

              <select
                value={formData.hierarchy}
                onChange={(e) => handleChange("hierarchy", e.target.value)}
              >
                <option value="All">All Levels</option>
                <option value="1">Level 1 - CEO</option>
                <option value="2">Level 2 - HR</option>
                <option value="3">Level 3 - Admin</option>
                <option value="4">Level 4 - Manager</option>
                <option value="5">Level 5 - Team Leader</option>
                <option value="6">Level 6 - Employee</option>
              </select>
            </div>

            {/* Parent Role */}
            <div className="role-form-group">
              <label>Parent Role</label>
              <select
                value={formData.parentRole}
                onChange={(e) => handleChange("parentRole", e.target.value)}
              >
                <option value="">None</option>
              </select>
            </div>

            {/* Dashboard */}

            <div className="role-form-group">
              <label>
                <LayoutDashboard size={16} />
                Default Dashboard
              </label>

              <select
                value={formData.dashboard}
                onChange={(e) => handleChange("dashboard", e.target.value)}
              >
                <option value="">Select Dashboard</option>

                <option>CEO Dashboard</option>

                <option>HR Dashboard</option>

                <option>Employee Dashboard</option>
              </select>
            </div>

            {/* Description */}

            <div className="role-form-group">
              <label>Description</label>

              <textarea
                rows="4"
                placeholder="Enter role description..."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            {/* Access Channels */}

            <div className="role-section-title">
              <Globe size={18} />
              Access Channels
            </div>

            <div className="access-channel-grid">
              <div
                className={`access-card ${formData.webAccess ? "active" : ""}`}
                onClick={() => handleChange("webAccess", !formData.webAccess)}
              >
                <Globe size={22} />

                <span>Web</span>

                {formData.webAccess && <Check size={18} />}
              </div>

              <div
                className={`access-card ${
                  formData.mobileAccess ? "active" : ""
                }`}
                onClick={() =>
                  handleChange("mobileAccess", !formData.mobileAccess)
                }
              >
                <Smartphone size={22} />

                <span>Mobile</span>

                {formData.mobileAccess && <Check size={18} />}
              </div>

              <div
                className={`access-card ${formData.apiAccess ? "active" : ""}`}
                onClick={() => handleChange("apiAccess", !formData.apiAccess)}
              >
                <Server size={22} />

                <span>API</span>

                {formData.apiAccess && <Check size={18} />}
              </div>
            </div>
          </div>

          {/* Right Section */}

          <div className="role-summary-section">
            <div className="role-section-title">
              <Shield size={18} />
              Role Summary
            </div>

            <div className="role-summary-card">
              <div className="summary-item">
                <span>Role Name</span>

                <strong>{formData.roleName || "-"}</strong>
              </div>

              <div className="summary-item">
                <span>Role Code</span>

                <strong>{formData.roleCode || "-"}</strong>
              </div>

              <div className="summary-item">
                <span>Hierarchy</span>

                <strong>
                  {formData.hierarchy ? `Level ${formData.hierarchy}` : "-"}
                </strong>
              </div>

              <div className="summary-item">
                <span>Dashboard</span>

                <strong>{formData.dashboard || "-"}</strong>
              </div>

              <div className="summary-item">
                <span>Status</span>

                <label className="status-switch">
                  <input
                    type="checkbox"
                    checked={formData.status}
                    onChange={(e) => handleChange("status", e.target.checked)}
                  />

                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="role-modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="save-btn" onClick={handleSubmit}>
            {isEdit ? "Update Role" : "Create Role"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoleModal;