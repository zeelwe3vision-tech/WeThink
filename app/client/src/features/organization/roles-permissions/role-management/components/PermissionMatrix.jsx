import "./PermissionMatrix.css";

const actions = ["View", "Create", "Edit", "Delete", "Assign", "Approve"];

function PermissionMatrix({
  permissions,
  onTogglePermission,
  onGrantAll,
  onDenyAll,
  onReset,
}) {
  return (
    <div className="permission-matrix">
      <div className="permission-matrix-header">
        <h3>Permission Matrix</h3>

        <div className="permission-matrix-actions">
          <button className="matrix-btn" onClick={onGrantAll}>
            Grant All
          </button>

          <button className="matrix-btn" onClick={onDenyAll}>
            Deny All
          </button>

          <button className="matrix-btn" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>

      <table className="permission-table">
        <thead>
          <tr>
            <th>Module</th>

            {actions.map((action) => (
              <th key={action}>{action}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {permissions.map((module) => (
            <tr key={module.module}>
              <td className="module-name">{module.module}</td>

              {actions.map((action) => (
                <td key={action}>
                  <label className="permission-switch">
                    <input
                      type="checkbox"
                      checked={module[action.toLowerCase()]}
                      onChange={() =>
                        onTogglePermission(module.module, action.toLowerCase())
                      }
                    />

                    <span className="permission-slider"></span>
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PermissionMatrix;