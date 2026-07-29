import "./PermissionMatrixTable.css";

function PermissionMatrixTable({ permissions, onPermissionChange }) {
  const columns = [
    {
      key: "view",
      label: "View",
      icon: "◉",
    },
    {
      key: "create",
      label: "Create",
      icon: "⊞",
    },
    {
      key: "edit",
      label: "Edit",
      icon: "✎",
    },
    {
      key: "delete",
      label: "Delete",
      icon: "▣",
    },
    {
      key: "assign",
      label: "Assign",
      icon: "♙",
    },
    {
      key: "approve",
      label: "Approve",
      icon: "◉",
    },
    {
      key: "all",
      label: "All",
    },
  ];

  const handleToggle = (index, key) => {
    const updated = !permissions[index][key];

    onPermissionChange(index, key, updated);
  };

  return (
    <div className="permission-table-container">
      <table className="permission-table">
        <thead>
          <tr>
            <th className="module-heading">Module Permissions</th>

            {columns.map((column) => (
              <th key={column.key}>
                <div className="permission-heading">
                  {column.icon && <span>{column.icon}</span>}

                  {column.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {permissions.map((permission, index) => (
            <tr key={permission.module}>
              <td className="module-name">
                {permission.icon && (
                  <span className="module-icon">{permission.icon}</span>
                )}

                {permission.module}
              </td>

              {columns.map((column) => (
                <td key={column.key}>
                  <button
                    className={
                      permission[column.key] ? "toggle active" : "toggle"
                    }
                    onClick={() => handleToggle(index, column.key)}
                  >
                    <span></span>
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PermissionMatrixTable;
