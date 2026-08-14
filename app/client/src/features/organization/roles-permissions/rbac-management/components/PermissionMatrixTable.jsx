import { useRef } from "react";

import "./PermissionMatrixTable.css";

const INDIVIDUAL_PERMISSIONS = [
  "view",
  "create",
  "edit",
  "delete",
  "assign",
  "approve",
];

function PermissionMatrixTable({ permissions = [], onPermissionChange }) {
  /*
   * Stores the permission combination that existed
   * before the user manually enabled "All".
   */
  const previousPermissionState = useRef({});

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

  /* =========================================================
     Get Stable Row Key
  ========================================================= */

  const getRowKey = (permission, index) => {
    return permission?.module || index;
  };

  /* =========================================================
     Check Whether Entire Row Is Enabled
  ========================================================= */

  const getAllState = (permission) => {
    return INDIVIDUAL_PERMISSIONS.every(
      (permissionKey) => permission?.[permissionKey] === true,
    );
  };

  /* =========================================================
     Toggle Permission
  ========================================================= */

  const handleToggle = (index, key) => {
    const currentRow = permissions[index];

    if (!currentRow || !onPermissionChange) {
      return;
    }

    const rowKey = getRowKey(currentRow, index);

    /* =======================================================
       ALL Toggle
    ======================================================= */

    if (key === "all") {
      const allCurrentlyEnabled = getAllState(currentRow);

      /*
       * ALL currently OFF
       *
       * Save current permission combination first,
       * then enable every permission.
       */
      if (!allCurrentlyEnabled) {
        previousPermissionState.current[rowKey] = {
          view: currentRow.view === true,
          create: currentRow.create === true,
          edit: currentRow.edit === true,
          delete: currentRow.delete === true,
          assign: currentRow.assign === true,
          approve: currentRow.approve === true,
        };

        const updatedRow = {
          ...currentRow,

          view: true,
          create: true,
          edit: true,
          delete: true,
          assign: true,
          approve: true,

          all: true,
        };

        onPermissionChange(index, "all", true, updatedRow);

        return;
      }

      /*
       * ALL currently ON
       *
       * Restore the permission combination that
       * existed before "All" was enabled.
       */
      const previousState = previousPermissionState.current[rowKey];

      if (previousState) {
        const updatedRow = {
          ...currentRow,
          ...previousState,
        };

        updatedRow.all = getAllState(updatedRow);

        onPermissionChange(index, "all", updatedRow.all, updatedRow);

        delete previousPermissionState.current[rowKey];

        return;
      }

      /*
       * Fallback:
       *
       * All six permissions were enabled manually,
       * so there is no stored previous state.
       * Clicking All OFF disables all six.
       */
      const updatedRow = {
        ...currentRow,

        view: false,
        create: false,
        edit: false,
        delete: false,
        assign: false,
        approve: false,

        all: false,
      };

      onPermissionChange(index, "all", false, updatedRow);

      return;
    }

    /* =======================================================
       Individual Permission Toggle
    ======================================================= */

    const updatedRow = {
      ...currentRow,
      [key]: !currentRow[key],
    };

    /*
     * Automatically:
     *
     * all six ON  → All ON
     * any one OFF → All OFF
     */
    updatedRow.all = getAllState(updatedRow);

    onPermissionChange(index, key, updatedRow[key], updatedRow);
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
          {permissions.map((permission, index) => {
            /*
             * "All" is always derived from the
             * six actual permission values.
             */
            const isAllActive = getAllState(permission);

            return (
              <tr key={permission.module || index}>
                <td className="module-name">
                  {permission.icon && (
                    <span className="module-icon">{permission.icon}</span>
                  )}

                  {permission.module}
                </td>

                {columns.map((column) => {
                  const isActive =
                    column.key === "all"
                      ? isAllActive
                      : permission[column.key] === true;

                  return (
                    <td key={column.key}>
                      <button
                        type="button"
                        className={isActive ? "toggle active" : "toggle"}
                        onClick={() => handleToggle(index, column.key)}
                        aria-pressed={isActive}
                        aria-label={`${permission.module} ${column.label} permission`}
                      >
                        <span />
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PermissionMatrixTable;
