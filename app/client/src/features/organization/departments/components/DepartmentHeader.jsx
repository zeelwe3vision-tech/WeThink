// Dev - 28/07/26 - Start

// React
import React from "react";

// Icons
import {
  Building2,
  Users,
  UserCheck,
  UserX,
  Plus,
  Download,
} from "lucide-react";

// CSS
import "./DepartmentHeader.css";

/**
 * Department Header Component
 *
 * Props
 * onAddDepartment
 */

function DepartmentHeader({
  onAddDepartment,
  totalDepartments,
  activeDepartments,
  inactiveDepartments,
  totalEmployees,
}) {

  // ------------------------------------------
  // Statistics Data
  // ------------------------------------------

  const statistics = [

  {
    title: "Total Departments",
    value: totalDepartments,
    icon: <Building2 size={26} />,
    color: "purple",
  },

  {
    title: "Active Departments",
    value: activeDepartments,
    icon: <UserCheck size={26} />,
    color: "green",
  },

  {
    title: "Inactive Departments",
    value: inactiveDepartments,
    icon: <UserX size={26} />,
    color: "orange",
  },

  {
    title: "Total Employees",
    value: totalEmployees,
    icon: <Users size={26} />,
    color: "pink",
  },

];

  return (

    <>

      {/* ======================================
          Top Header
      ====================================== */}

      <div className="department-header">

        {/* Left */}

        <div>

          <h1>

            Department Management

          </h1>

          <p>

            Organize and manage all departments
            within the organization.

          </p>

        </div>

        {/* Right */}

        <div className="department-header-buttons">

          {/* Add Department */}

          <button
            className="add-department-btn"
            onClick={onAddDepartment}
          >

            <Plus size={18} />

            Add Department

          </button>

        </div>

      </div>

      {/* ======================================
          Statistics Cards
      ====================================== */}

      <div className="department-stats">

        {

          statistics.map((item) => (

            <div
              className="department-stat-card"
              key={item.title}
            >

              {/* Icon */}

              <div
                className={`stat-icon ${item.color}`}
              >

                {item.icon}

              </div>

              {/* Text */}

              <div className="stat-details">

                <h5>

                  {item.title}

                </h5>

                <h2>

                  {item.value}

                </h2>

                <span>

                  {item.growth}

                </span>

                <small>

                  {item.subtitle}

                </small>

              </div>

            </div>

          ))

        }

      </div>

    </>

  );

}

export default DepartmentHeader;

// Dev - 28/07/26 - End