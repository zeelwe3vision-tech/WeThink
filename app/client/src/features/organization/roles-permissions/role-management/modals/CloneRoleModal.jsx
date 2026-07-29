import { useEffect, useState } from "react";
import "./CloneRoleModal.css";
import { X, Copy, Check } from "lucide-react";

function CloneRoleModal({ open, role, onClose, onClone }) {
  const [roleName, setRoleName] = useState("");
  const [roleCode, setRoleCode] = useState("");
  const [hierarchy, setHierarchy] = useState("");
  const [copyPermissions, setCopyPermissions] = useState(true);

  useEffect(() => {
    if (open && role) {
      setRoleName(`${role.role_name} Copy`);
      setRoleCode(`${role.role_code}_COPY`);
      setHierarchy(role.hierarchy_level || "");
      setCopyPermissions(true);
    }

    if (!open) {
      setRoleName("");
      setRoleCode("");
      setHierarchy("");
      setCopyPermissions(true);
    }
  }, [open, role]);

  if (!open) return null;

  const handleClone = () => {
    if (!roleName.trim() || !roleCode.trim()) {
      return;
    }

    onClone({
      role_name: roleName.trim(),
      role_code: roleCode.trim(),
      hierarchy_level: hierarchy || role?.hierarchy_level,
      copy_permissions: copyPermissions,
    });
  };

  return (
    <div className="clone-role-overlay">
      <div className="clone-role-modal">
        {/* Header */}

        <div className="clone-role-header">
          <div className="clone-role-title">
            <Copy size={22} />

            <div>
              <h2>Clone Role</h2>

              <p>Create a new role by copying an existing one.</p>
            </div>
          </div>

          <button
            className="clone-close-btn"
            onClick={() => {
              setRoleName("");
              setRoleCode("");
              setHierarchy("");
              setCopyPermissions(true);
              onClose();
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="clone-role-body">
          <div className="clone-source-role">
            <label>Source Role</label>

            <div className="source-role-card">
              <strong>{role?.role_name}</strong>

              <span>{role?.description}</span>
            </div>
          </div>

          <div className="clone-form-group">
            <label>New Role Name *</label>

            <input
              type="text"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          <div className="clone-form-group">
            <label>New Role Code *</label>

            <input
              type="text"
              placeholder="Example : HR_MANAGER"
              value={roleCode}
              onChange={(e) => setRoleCode(e.target.value)}
            />
          </div>

          <div className="clone-form-group">
            <label>Hierarchy Level</label>

            <select
              value={hierarchy}
              onChange={(e) => setHierarchy(e.target.value)}
            >
              <option value="">Keep Same</option>

              <option value="1">Level 1</option>

              <option value="2">Level 2</option>

              <option value="3">Level 3</option>

              <option value="4">Level 4</option>

              <option value="5">Level 5</option>
            </select>
          </div>

          <label className="copy-permission">
            <input
              type="checkbox"
              checked={copyPermissions}
              onChange={(e) => setCopyPermissions(e.target.checked)}
            />
            <span className="permission-check">
              <Check size={14} />
            </span>
            Copy all permissions from source role
          </label>
        </div>

        {/* Footer */}

        <div className="clone-role-footer">
          <button
            className="cancel-btn"
            onClick={() => {
              setRoleName("");
              setRoleCode("");
              setHierarchy("");
              setCopyPermissions(true);
              onClose();
            }}
          >
            Cancel
          </button>

          <button className="clone-btn" onClick={handleClone}>
            <Copy size={18} />
            Clone Role
          </button>
        </div>
      </div>
    </div>
  );
}
export default CloneRoleModal;
