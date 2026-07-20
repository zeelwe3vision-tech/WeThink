import { MoreVertical, Mail } from "lucide-react";
import "./EmployeeTable.css";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const getStatusClass = (status) => {
  switch (status) {
    case "Active":
      return "status-badge status-active";

    case "Inactive":
      return "status-badge status-inactive";

    case "On Leave":
      return "status-badge status-leave";

    default:
      return "status-badge";
  }
};

function EmployeeTable({ employees = [], onOpenDrawer }) {
  return (
    <div className="employee-table-container">
      <div className="table-wrapper">
        <table className="employee-table">
          <colgroup>
            <col style={{ width: "22%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "38%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "3%" }} />
          </colgroup>

          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  {/* ===========================
                      Employee
                  ============================ */}

                  <td className="employee-cell">
                    <div className="employee-info">
                      <div className="employee-avatar-wrapper">
                        <img
                          src={
                            employee.profile_image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              employee.full_name,
                            )}&background=7C3AED&color=ffffff`
                          }
                          alt={employee.full_name}
                          className="employee-avatar"
                        />
                      </div>

                      <div className="employee-details">
                        <h4 className="employee-name">{employee.full_name}</h4>

                        <p className="employee-id">{employee.employee_id}</p>

                        <p className="employee-email">
                          <Mail size={13} />
                          <span>{employee.email}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ===========================
                      Department
                  ============================ */}

                  <td>
                    <div className="department-block">
                      <div className="department-name">
                        {employee.department}
                      </div>

                      <div className="department-subtitle">Department</div>
                    </div>
                  </td>

                  {/* ===========================
                      Designation
                  ============================ */}

                  <td>
                    <div className="designation-block">
                      <div className="designation-name">
                        {employee.designation}
                      </div>

                      <div className="designation-subtitle">Reporting To</div>

                      <div className="designation-manager">
                        {employee.reporting_manager}
                      </div>
                    </div>
                  </td>

                  {/* ===========================
                      Skills
                  ============================ */}

                  <td>
                    <div className="skills-list">
                      <span className="skill-chip">-</span>
                    </div>
                  </td>

                  {/* ===========================
                      Status
                  ============================ */}

                  <td>
                    <span className={getStatusClass(employee.status)}>
                      {employee.status}
                    </span>
                  </td>

                  {/* ===========================
                      Actions
                  ============================ */}

                  <td>
                    <div className="action-menu">
                      <button
                        className="action-menu-btn"
                        onClick={() => onOpenDrawer(employee)}
                      >
                        <MoreVertical size={18} strokeWidth={2.2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="empty-row">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===========================
          Pagination
      ============================ */}

      <div className="employee-pagination">
        <div className="pagination-text">
          Showing 1 to {employees.length} of {employees.length} employees
        </div>

        <div className="pagination-buttons">
          <button className="pagination-btn">
            <ChevronsLeft size={18} />
          </button>

          <button className="pagination-btn">
            <ChevronLeft size={18} />
          </button>

          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>

          <button className="pagination-btn">
            <ChevronRight size={18} />
          </button>

          <button className="pagination-btn">
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default EmployeeTable;
