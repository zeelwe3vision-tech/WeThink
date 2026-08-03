import React from "react";
import "../styles/DepartmentTable.css";
import { MoreVertical } from "lucide-react";

function DepartmentTable({
  departments,
  onViewDepartment,
}) {
  return (
    <div className="table-container">
      <table className="department-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created On</th>
          </tr>
        </thead>

        <tbody>

          {departments.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                className="no-data"
              >
                No Departments Found
              </td>
            </tr>

          ) : (

            departments.map((department) => (

              <tr key={department.id}>

                {/* Click Name → Drawer */}

                <td>

                  <button
                    className="department-name"
                    onClick={() =>
                      onViewDepartment(department)
                    }
                  >
                    {department.name}
                  </button>

                </td>

                <td>
                  {department.department}
                </td>

                <td>
                  {department.role}
                </td>

                <td>

                  <span
                    className={
                      department.status === "Active"
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {department.status}
                  </span>

                </td>

                <td>
                  {department.createdOn}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>
    </div>
  );
}

export default DepartmentTable;