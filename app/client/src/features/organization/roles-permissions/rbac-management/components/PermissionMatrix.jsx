import "./PermissionMatrix.css";
import { useMemo } from "react";

function PermissionMatrix({ permissions = [], setPermissions }) {
  /* ==========================================================
     Toggle Single Permission
  ========================================================== */

  const handleToggle = (index, field) => {
    const updated = [...permissions];

    updated[index][field] = !updated[index][field];

    // Update ALL checkbox automatically

    updated[index].all =
      updated[index].view &&
      updated[index].create &&
      updated[index].edit &&
      updated[index].delete &&
      updated[index].assign &&
      updated[index].approve;

    setPermissions(updated);
  };

  /* ==========================================================
     Toggle Complete Row
  ========================================================== */

  const handleToggleAll = (index) => {
    const updated = [...permissions];

    const value = !updated[index].all;

    updated[index] = {
      ...updated[index],

      all: value,

      view: value,
      create: value,
      edit: value,
      delete: value,
      assign: value,
      approve: value,
    };

    setPermissions(updated);
  };

  /* ==========================================================
     Count Permissions
  ========================================================== */

  const totalGranted = useMemo(() => {
    return permissions.reduce((total, row) => {
      return (
        total +
        [
          row.view,
          row.create,
          row.edit,
          row.delete,
          row.assign,
          row.approve,
        ].filter(Boolean).length
      );
    }, 0);
  }, [permissions]);

  return (
    <div className="permission-matrix-card">
      {/* ========================================= */}

      <div className="permission-matrix-header">
        <div>
          <h3>Permission Matrix</h3>

          <p>Configure employee permissions module wise.</p>
        </div>

        <div className="permission-count">
          {totalGranted} Permissions Granted
        </div>
      </div>

      {/* ========================================= */}

      <div className="permission-table-wrapper">
        <table className="permission-table">
          <thead>
            <tr>
              <th>Module</th>

              <th>All</th>

              <th>View</th>

              <th>Create</th>

              <th>Edit</th>

              <th>Delete</th>

              <th>Assign</th>

              <th>Approve</th>
            </tr>
          </thead>

          <tbody>
            {permissions.map((row, index) => (
              <tr key={row.module}>
                <td className="module-name">{row.module}</td>

                {/* ALL */}

                <td>
                  <input
                    type="checkbox"
                    checked={row.all}
                    onChange={() => handleToggleAll(index)}
                  />
                </td>

                {/* VIEW */}

                <td>
                  <input
                    type="checkbox"
                    checked={row.view}
                    onChange={() => handleToggle(index, "view")}
                  />
                </td>

                {/* CREATE */}

                <td>
                  <input
                    type="checkbox"
                    checked={row.create}
                    onChange={() => handleToggle(index, "create")}
                  />
                </td>

                {/* EDIT */}

                <td>
                  <input
                    type="checkbox"
                    checked={row.edit}
                    onChange={() => handleToggle(index, "edit")}
                  />
                </td>

                {/* DELETE */}

                <td>
                  <input
                    type="checkbox"
                    checked={row.delete}
                    onChange={() => handleToggle(index, "delete")}
                  />
                </td>

                {/* ASSIGN */}

                <td>
                  <input
                    type="checkbox"
                    checked={row.assign}
                    onChange={() => handleToggle(index, "assign")}
                  />
                </td>

                {/* APPROVE */}

                <td>
                  <input
                    type="checkbox"
                    checked={row.approve}
                    onChange={() => handleToggle(index, "approve")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PermissionMatrix;
