import { Plus } from "lucide-react";
import "./RoleHeader.css";

function RoleHeader({ onCreateRole }) {
  return (
    <div className="role-header">
      <div className="role-header-left">
        <h1 className="role-page-title">Role Management</h1>

        <p className="role-page-subtitle">
          Create, organize and manage organization roles.
        </p>
      </div>

      <div className="role-header-right">
        <button className="role-create-btn" onClick={onCreateRole}>
          <Plus size={18} />
          Create Role
        </button>
      </div>
    </div>
  );
}

export default RoleHeader;
