import "./PermissionToolbar.css";
import { ShieldCheck, ShieldX, RotateCcw } from "lucide-react";

function PermissionToolbar({ selectedItem, onGrantAll, onDenyAll, onReset }) {
  return (
    <div className="permission-toolbar">
      <div className="permission-toolbar-info">
        <span className="toolbar-label">Managing Permissions</span>

        <h3 className="toolbar-title">
          {selectedItem?.name || "No Selection"}
        </h3>
      </div>

      <div className="permission-toolbar-actions">
        <button className="toolbar-btn grant" onClick={onGrantAll}>
          <ShieldCheck size={18} />
          Grant All
        </button>

        <button className="toolbar-btn deny" onClick={onDenyAll}>
          <ShieldX size={18} />
          Deny All
        </button>

        <button className="toolbar-btn reset" onClick={onReset}>
          <RotateCcw size={18} />
          Reset
        </button>
      </div>
    </div>
  );
}
export default PermissionToolbar;