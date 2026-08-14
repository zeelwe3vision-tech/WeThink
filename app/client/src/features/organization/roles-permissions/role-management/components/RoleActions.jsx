import { Eye, Pencil, Copy, Trash2 } from "lucide-react";
import "./RoleActions.css";

function RoleActions({ role, onView, onEdit, onClone, onDelete }) {
  return (
    <div className="role-actions">
      <button
        type="button"
        className="role-action-btn view"
        title="View Role"
        onClick={() => onView(role)}
      >
        <Eye size={17} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        className="role-action-btn edit"
        title="Edit Role"
        onClick={() => onEdit(role)}
      >
        <Pencil size={17} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        className="role-action-btn clone"
        title="Clone Role"
        onClick={() => onClone(role)}
      >
        <Copy size={17} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        className="role-action-btn delete"
        title="Delete Role"
        onClick={() => onDelete(role?.id || role)}
      >
        <Trash2 size={17} strokeWidth={1.8} />
      </button>
    </div>
  );
}

export default RoleActions;
