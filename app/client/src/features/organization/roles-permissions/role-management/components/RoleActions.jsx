import "./RoleTable.css";
import { Eye, Pencil, Copy, Trash2 } from "lucide-react";

function RoleActions({ role, onView, onEdit, onClone, onDelete }) {
  return (
    <div className="role-actions">
      <button
        className="role-action-btn view"
        title="View Role"
        onClick={() => onView(role)}
      >
        <Eye size={16} />
      </button>

      <button
        className="role-action-btn edit"
        title="Edit Role"
        onClick={() => onEdit(role)}
      >
        <Pencil size={16} />
      </button>

      <button
        className="role-action-btn clone"
        title="Clone Role"
        onClick={() => onClone(role)}
      >
        <Copy size={16} />
      </button>

      <button
        className="role-action-btn delete"
        title="Delete Role"
        onClick={() => onDelete(role.id)}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default RoleActions;
