import { useEffect, useState } from "react";
import "./EditRoleModal.css";
import { X, Save } from "lucide-react";

function EditRoleModal({ open, role, onClose, onSave }) {
  const [formData, setFormData] = useState({
    roleName: "",
    roleCode: "",
    description: "",
    hierarchy: "",
    status: true,
  });

  useEffect(() => {
    if (role) {
      setFormData({
        roleName: role.role_name || "",
        roleCode: role.role_code || "",
        description: role.description || "",
        hierarchy: String(role.hierarchy_level || ""),
        status: role.status,
      });
    }
  }, [role]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="edit-role-overlay">
      <div className="edit-role-modal">
        {/* Header */}

        <div className="edit-role-header">
          <h2>Edit Role</h2>

          <button className="edit-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="edit-role-body">
          <div className="edit-form-group">
            <label>Role Name *</label>

            <input
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
            />
          </div>

          <div className="edit-form-group">
            <label>Role Code *</label>

            <input
              name="roleCode"
              value={formData.roleCode}
              onChange={handleChange}
            />
          </div>

          <div className="edit-form-group">
            <label>Description</label>

            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="edit-form-group">
            <label>Hierarchy Level *</label>

            <select
              name="hierarchy"
              value={formData.hierarchy}
              onChange={handleChange}
            >
              <option value="">Select Level</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
              <option value="6">Level 6</option>
            </select>
          </div>

          <label className="edit-role-checkbox">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
            Active Role
          </label>
        </div>

        {/* Footer */}

        <div className="edit-role-footer">
          <button className="edit-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="edit-save-btn" onClick={handleSubmit}>
            <Save size={17} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRoleModal;
