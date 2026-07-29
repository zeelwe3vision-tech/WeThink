import "./RoleTable.css";
import RoleActions from "./RoleActions";
import { CheckCircle2, XCircle } from "lucide-react";

function RoleTable({ roles, onView, onEdit, onClone, onDelete }) {
  return (
    <div className="role-table-wrapper">
      <table className="role-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Role Code</th>
            <th>Description</th>
            <th>Hierarchy</th>
            <th>Members</th>
            <th>Status</th>
            <th align="center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id}>
                <td>
                  <div className="role-name-cell">
                    <div className="role-avatar">
                      {role.role_name?.charAt(0).toUpperCase()}
                    </div>
                    <span>{role.role_name}</span>
                  </div>
                </td>

                <td>{role.role_code}</td>

                <td className="role-description">{role.description || "-"}</td>

                <td>
                  <span className="hierarchy-badge">
                    Level {role.hierarchy_level}
                  </span>
                </td>

                <td>
                  <span className="member-count">
                    {role.total_members || 0}
                  </span>
                </td>

                <td>
                  {role.status ? (
                    <span className="status-badge active">
                      <CheckCircle2 size={14} />
                      Active
                    </span>
                  ) : (
                    <span className="status-badge inactive">
                      <XCircle size={14} />
                      Inactive
                    </span>
                  )}
                </td>

                <td align="center">
                  <RoleActions
                    role={role}
                    onView={onView}
                    onEdit={onEdit}
                    onClone={onClone}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="role-empty">
                No roles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RoleTable;
