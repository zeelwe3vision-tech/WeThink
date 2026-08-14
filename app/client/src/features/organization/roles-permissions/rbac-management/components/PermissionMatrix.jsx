import "./PermissionMatrix.css";
import { useMemo, useRef } from "react";

const INDIVIDUAL_PERMISSIONS = [
  "view",
  "create",
  "edit",
  "delete",
  "assign",
  "approve",
];

function PermissionMatrix({ permissions = [], setPermissions }) {
  /*
   * Stores the permission state that existed
   * before the user manually enabled "All".
   *
   * Example:
   * Dashboard => {
   *   view: true,
   *   create: false,
   *   ...
   * }
   */
  const previousPermissionState = useRef({});

  /* =========================================================
     Get Row Key
  ========================================================= */

  const getRowKey = (row, index) => {
    return row?.module || index;
  };

  /* =========================================================
     Check Whether All Individual Permissions Are Enabled
  ========================================================= */

  const areAllPermissionsEnabled = (row) => {
    return INDIVIDUAL_PERMISSIONS.every(
      (permissionKey) => row?.[permissionKey] === true,
    );
  };

  /* =========================================================
     Toggle Single Permission
  ========================================================= */

  const handleToggle = (index, field) => {
    setPermissions((previousPermissions) =>
      previousPermissions.map((row, rowIndex) => {
        if (rowIndex !== index) {
          return row;
        }

        const updatedRow = {
          ...row,
          [field]: !row[field],
        };

        /*
         * Automatically turn "All" ON only when
         * all six individual permissions are ON.
         *
         * Automatically turn "All" OFF when
         * any individual permission is OFF.
         */
        updatedRow.all = areAllPermissionsEnabled(updatedRow);

        return updatedRow;
      }),
    );
  };

  /* =========================================================
     Toggle Complete Row
  ========================================================= */

  const handleToggleAll = (index) => {
    setPermissions((previousPermissions) =>
      previousPermissions.map((row, rowIndex) => {
        if (rowIndex !== index) {
          return row;
        }

        const rowKey = getRowKey(row, index);

        /*
         * Do not trust row.all alone.
         * Derive current All state from the
         * six actual permissions.
         */
        const allCurrentlyEnabled = areAllPermissionsEnabled(row);

        /* =================================================
             ALL IS CURRENTLY OFF
             Save current permissions, then enable everything
          ================================================= */

        if (!allCurrentlyEnabled) {
          previousPermissionState.current[rowKey] = {
            view: row.view === true,
            create: row.create === true,
            edit: row.edit === true,
            delete: row.delete === true,
            assign: row.assign === true,
            approve: row.approve === true,
          };

          return {
            ...row,

            view: true,
            create: true,
            edit: true,
            delete: true,
            assign: true,
            approve: true,

            all: true,
          };
        }

        /* =================================================
             ALL IS CURRENTLY ON
             Restore state from before "All" was enabled
          ================================================= */

        const previousState = previousPermissionState.current[rowKey];

        if (previousState) {
          const restoredRow = {
            ...row,
            ...previousState,
          };

          restoredRow.all = areAllPermissionsEnabled(restoredRow);

          delete previousPermissionState.current[rowKey];

          return restoredRow;
        }

        /* =================================================
             FALLBACK

             This happens when all six permissions were enabled
             manually instead of through the "All" button.

             In that case clicking All OFF disables everything.
          ================================================= */

        return {
          ...row,

          view: false,
          create: false,
          edit: false,
          delete: false,
          assign: false,
          approve: false,

          all: false,
        };
      }),
    );
  };

  /* =========================================================
     Count Permissions
  ========================================================= */

  const totalGranted = useMemo(() => {
    return permissions.reduce((total, row) => {
      return (
        total +
        INDIVIDUAL_PERMISSIONS.filter(
          (permissionKey) => row[permissionKey] === true,
        ).length
      );
    }, 0);
  }, [permissions]);

  /* =========================================================
     Render
  ========================================================= */

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
            {permissions.map((row, index) => {
              /*
               * Always calculate All from the
               * six actual permission values.
               */
              const isAllEnabled = areAllPermissionsEnabled(row);

              return (
                <tr key={row.module || index}>
                  <td className="module-name">{row.module}</td>

                  {/* ALL */}

                  <td>
                    <input
                      type="checkbox"
                      checked={isAllEnabled}
                      onChange={() => handleToggleAll(index)}
                    />
                  </td>

                  {/* VIEW */}

                  <td>
                    <input
                      type="checkbox"
                      checked={row.view === true}
                      onChange={() => handleToggle(index, "view")}
                    />
                  </td>

                  {/* CREATE */}

                  <td>
                    <input
                      type="checkbox"
                      checked={row.create === true}
                      onChange={() => handleToggle(index, "create")}
                    />
                  </td>

                  {/* EDIT */}

                  <td>
                    <input
                      type="checkbox"
                      checked={row.edit === true}
                      onChange={() => handleToggle(index, "edit")}
                    />
                  </td>

                  {/* DELETE */}

                  <td>
                    <input
                      type="checkbox"
                      checked={row.delete === true}
                      onChange={() => handleToggle(index, "delete")}
                    />
                  </td>

                  {/* ASSIGN */}

                  <td>
                    <input
                      type="checkbox"
                      checked={row.assign === true}
                      onChange={() => handleToggle(index, "assign")}
                    />
                  </td>

                  {/* APPROVE */}

                  <td>
                    <input
                      type="checkbox"
                      checked={row.approve === true}
                      onChange={() => handleToggle(index, "approve")}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PermissionMatrix;
