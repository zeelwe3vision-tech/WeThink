import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  FiHome,
  FiChevronDown,
  FiChevronRight,
  FiClipboard,
  FiCalendar,
  FiFileText,
  FiBell,
  FiSettings,
  FiShield,
  FiLogOut,
  FiBriefcase,
} from "react-icons/fi";

import "./Sidebar.css";
// import logo from "../../assets/images/wethink-logo.png";

const Sidebar = () => {
  const [organizationOpen, setOrganizationOpen] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}

      <div className="sidebar-logo">
        <h2>WeThink</h2>
      </div>

      {/* Navigation */}

      <nav className="sidebar-menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiHome />
          <span>Dashboard</span>
        </NavLink>

        {/* Organization */}

        <div className="menu-dropdown">
          <button
            className={`menu-item dropdown-btn ${
              organizationOpen ? "active" : ""
            }`}
            onClick={() => setOrganizationOpen(!organizationOpen)}
          >
            <div className="menu-left">
              <FiBriefcase />
              <span>Organization</span>
            </div>

            {organizationOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {organizationOpen && (
            <div className="submenu">
              <NavLink
                to="/organization/employees"
                className={({ isActive }) =>
                  isActive ? "submenu-item active" : "submenu-item"
                }
              >
                Employee Info
              </NavLink>

              <NavLink
                to="/organization/departments"
                className={({ isActive }) =>
                  isActive ? "submenu-item active" : "submenu-item"
                }
              >
                Department List
              </NavLink>

              <NavLink
                to="/organization/roles"
                className={({ isActive }) =>
                  isActive ? "submenu-item active" : "submenu-item"
                }
              >
                Role Management
              </NavLink>

              <NavLink
                to="/organization/rbac"
                className={({ isActive }) =>
                  isActive ? "submenu-item active" : "submenu-item"
                }
              >
                RBAC Management
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiClipboard />
          <span>Task Management</span>
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiCalendar />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/leave"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiFileText />
          <span>Leave</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiFileText />
          <span>Reports</span>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiSettings />
          <span>Settings</span>
        </NavLink>

        <NavLink
          to="/audit-logs"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiShield />
          <span>Audit Logs</span>
        </NavLink>
      </nav>

      {/* Logout */}

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
