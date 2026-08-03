// Dev - 28/07/26 - Start

import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { CalendarDays } from "lucide-react";
import "./DepartmentTable.css";
function DepartmentTable({

  departments,
  handleViewDepartment,
  handleEditDepartment,
  handleDeleteClick,

}) {
  return (

    <div className="department-table-container">
      <table className="department-table">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Department Code</th>
            <th>Category</th>
            <th>Hod_Id</th>
            <th>Employees</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>

        </thead>
        <tbody>

        {
          departments.length === 0 ?
          (
            <tr>

              <td 
                colSpan="8"
                className="no-data"
              >

                No Departments Found

              </td>

            </tr>


          )
          :
          (

            departments.map((department)=>(
              <tr key={department.id}>
                {/* Department Name */}
                <td>

                  {department.departmentName || "_"}

                </td>
                {/* Department Code */}

                <td>
                  {department.departmentCode || "_"}
                </td>
                {/* Category */}
                <td>
                  {department.category || "-"}
                </td>
                {/* Department Head */}
                <td>
                  {department.head || "-"}
                </td>
                {/* Employees */}

                <td>
                  {department.employees || 0}
                </td>
                {/* Status */}
                <td>
                  <span
                    className={
                      `status-badge ${
                        department.status
                        ? "active"
                        : "inactive"
                      }`
                    }
                  >
                    {
                      department.status
                      ?
                      "Active"
                      :
                      "Inactive"
                    }
                  </span>
                </td>
               <td>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
    }}
  >

    <CalendarDays size={0} />

    {
      department.createdOn
        ? new Date(
            department.createdOn
          ).toLocaleDateString("en-GB")
        : "-"
    }

  </div>
</td>

                {/* Actions */}
                <td>

                  <div className="action-buttons">

                    {/* View */}

                    <button
                      className="action-btn view-btn"
                      onClick={() =>
                        handleViewDepartment(department)
                      }
                    >
                      <Eye size={16}/>
                    </button>

                    {/* Edit */}
                    <button
                      className="action-btn edit-btn"
                      onClick={() =>
                        handleEditDepartment(department)
                      }

                    >
                      <Pencil size={16}/>

                    </button>

                    {/* Delete */}
                    <button
                      className="action-btn table-delete-btn"

                      onClick={() =>
                        handleDeleteClick(department)
                      }
                    >

                      <Trash2 size={16}/>
                    </button>
                  </div>
                </td>
              </tr>

            ))

          )
        }

        </tbody>
      </table>

    </div>
  );
}

export default DepartmentTable;


// Dev - 28/07/26 - End