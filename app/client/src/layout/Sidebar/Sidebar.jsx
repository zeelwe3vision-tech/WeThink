import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  FiList,
} from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const organizationRouteActive = location.pathname.startsWith("/organization");
  const taskRouteActive = location.pathname.startsWith("/tasks");

  const [organizationOpen, setOrganizationOpen] = useState(
    organizationRouteActive,
  );
  const [taskManagementOpen, setTaskManagementOpen] = useState(taskRouteActive);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
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
            type="button"
            className={`menu-item dropdown-btn ${
              organizationRouteActive ? "active" : ""
            }`}
            onClick={() => setOrganizationOpen((previous) => !previous)}
            aria-expanded={organizationOpen}
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

        {/* Task Management */}
        <div className="menu-dropdown">
          <button
            type="button"
            className={`menu-item dropdown-btn ${
              taskRouteActive ? "active" : ""
            }`}
            onClick={() => setTaskManagementOpen((previous) => !previous)}
            aria-expanded={taskManagementOpen}
          >
            <div className="menu-left">
              <FiClipboard />
              <span>Task Management</span>
            </div>

            {taskManagementOpen ? <FiChevronDown /> : <FiChevronRight />}
          </button>

          {taskManagementOpen && (
            <div className="submenu">
              <NavLink
                to="/tasks"
                end
                className={({ isActive }) =>
                  isActive ? "submenu-item active" : "submenu-item"
                }
              >
                <FiList />
                <span>Task List</span>
              </NavLink>
            </div>
          )}
        </div>

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
        <button type="button" className="logout-btn" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;