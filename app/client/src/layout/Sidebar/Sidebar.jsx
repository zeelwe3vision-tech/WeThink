import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiChevronDown,
  FiChevronRight,
  FiClipboard,
  // FiBell,
  // FiShield,
  FiLogOut,
  FiBriefcase,
  // FiLightbulb,
  // FiGrid,
  // FiMessageSquare,
  // FiBarChart2,
  // FiUser,
} from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Active route checks for initial open states
  const organizationRouteActive = location.pathname.startsWith("/organization");
  const taskRouteActive = location.pathname.startsWith("/tasks");
  // const ideaRouteActive =
  //   location.pathname.startsWith("/idea-capture") ||
  //   location.pathname.startsWith("/ideas");

  // Dropdown open/close state logic
  const [organizationOpen, setOrganizationOpen] = useState(
    organizationRouteActive || true
  );
  const [taskManagementOpen, setTaskManagementOpen] = useState(
    taskRouteActive || true
  );
  // const [ideaCaptureOpen, setIdeaCaptureOpen] = useState(
  //   ideaRouteActive || false
  // );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <aside className="sidebar">
      {/* Logo Header */}
      <div className="sidebar-logo">
        <h2>WeThink</h2>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-menu">
        <div className="menu-section">
          {/* <span className="section-title">Modules</span> */}

          {/* 1. Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiHome className="menu-icon" />
            <span>Dashboard</span>
          </NavLink>

          {/* 2. Organization (Dropdown) */}
          <div className="menu-dropdown">
            <button
              type="button"
              className={`menu-item dropdown-btn ${
                organizationRouteActive ? "active-parent" : ""
              }`}
              onClick={() => setOrganizationOpen((previous) => !previous)}
              aria-expanded={organizationOpen}
            >
              <div className="menu-left">
                <FiBriefcase className="menu-icon" />
                <span>Organization</span>
              </div>
              {organizationOpen ? (
                <FiChevronDown className="chevron-icon" />
              ) : (
                <FiChevronRight className="chevron-icon" />
              )}
            </button>

            {organizationOpen && (
              <div className="submenu">
                {/* Vertical tree connector line */}
                <div className="tree-line" />
                <div className="submenu-list">
                  <NavLink
                    to="/organization/employees"
                    className={({ isActive }) =>
                      `submenu-item ${isActive ? "active" : ""}`
                    }
                  >
                    Employee Info
                  </NavLink>

                  <NavLink
                    to="/organization/departments"
                    className={({ isActive }) =>
                      `submenu-item ${isActive ? "active" : ""}`
                    }
                  >
                    Department List
                  </NavLink>

                  <NavLink
                    to="/organization/roles"
                    className={({ isActive }) =>
                      `submenu-item ${isActive ? "active" : ""}`
                    }
                  >
                    Role Management
                  </NavLink>

                  <NavLink
                    to="/organization/rbac"
                    className={({ isActive }) =>
                      `submenu-item ${isActive ? "active" : ""}`
                    }
                  >
                    RBAC Management
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          {/* 3. Task Management (Dropdown) */}
          <div className="menu-dropdown">
            <button
              type="button"
              className={`menu-item dropdown-btn ${
                taskRouteActive ? "active-parent" : ""
              }`}
              onClick={() => setTaskManagementOpen((previous) => !previous)}
              aria-expanded={taskManagementOpen}
            >
              <div className="menu-left">
                <FiClipboard className="menu-icon" />
                <span>Task Management</span>
              </div>
              {taskManagementOpen ? (
                <FiChevronDown className="chevron-icon" />
              ) : (
                <FiChevronRight className="chevron-icon" />
              )}
            </button>

            {taskManagementOpen && (
              <div className="submenu">
                <div className="tree-line" />
                <div className="submenu-list">
                  <NavLink
                    to="/tasks"
                    end
                    className={({ isActive }) =>
                      `submenu-item ${isActive ? "active" : ""}`
                    }
                  >
                    Task List
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          {/* =========================================================
    FUTURE MODULES - UI STRUCTURE ONLY
========================================================= */}

          {/* 4. Idea Capture */}
          <div className="menu-item future-menu-item">
            <div className="menu-left">
              <span className="future-menu-icon">○</span>
              <span>Idea Capture</span>
            </div>

            <FiChevronRight className="chevron-icon" />
          </div>

          {/* 5. Project Management */}
          <div className="menu-item future-menu-item">
            <div className="menu-left">
              <span className="future-menu-icon">○</span>
              <span>Project Management</span>
            </div>
          </div>

          {/* 6. Suggestion */}
          <div className="menu-item future-menu-item">
            <div className="menu-left">
              <span className="future-menu-icon">○</span>
              <span>Suggestion</span>
            </div>
          </div>

          {/* 7. Notification */}
          <div className="menu-item future-menu-item">
            <div className="menu-left">
              <span className="future-menu-icon">○</span>
              <span>Notification</span>
            </div>
          </div>

          {/* 8. Reports & Analytics */}
          <div className="menu-item future-menu-item">
            <div className="menu-left">
              <span className="future-menu-icon">○</span>
              <span>Reports & Analytics</span>
            </div>
          </div>

          {/* 9. Profile */}
          <div className="menu-item future-menu-item">
            <div className="menu-left">
              <span className="future-menu-icon">○</span>
              <span>Profile</span>
            </div>
          </div>

          {/* 10. Administration */}
          <div className="menu-item future-menu-item">
            <div className="menu-left">
              <span className="future-menu-icon">○</span>
              <span>Administration</span>
            </div>
          </div>

          {/* 4. Idea Capture (Dropdown) */}
          {/* <div className="menu-dropdown">
            <button
              type="button"
              className={`menu-item dropdown-btn ${
                ideaRouteActive ? "active-parent" : ""
              }`}
              onClick={() => setIdeaCaptureOpen((previous) => !previous)}
              aria-expanded={ideaCaptureOpen}
            >
              <div className="menu-left">
                <FiLightbulb className="menu-icon" />
                <span>Idea Capture</span>
              </div>
              {ideaCaptureOpen ? (
                <FiChevronDown className="chevron-icon" />
              ) : (
                <FiChevronRight className="chevron-icon" />
              )}
            </button>

            {ideaCaptureOpen && (
              <div className="submenu">
                <div className="tree-line" />
                <div className="submenu-list">
                  <NavLink
                    to="/idea-capture/create"
                    className={({ isActive }) =>
                      `submenu-item ${isActive ? "active" : ""}`
                    }
                  >
                    Create Idea
                  </NavLink>
                </div>
              </div>
            )}
          </div> */}

          {/* 5. Project Management */}
          {/* <NavLink
            to="/project-management"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiGrid className="menu-icon" />
            <span>Project Management</span>
          </NavLink> */}

          {/* 6. Suggestion */}
          {/* <NavLink
            to="/suggestion"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiMessageSquare className="menu-icon" />
            <span>Suggestion</span>
          </NavLink> */}

          {/* 7. Notification */}
          {/* <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiBell className="menu-icon" />
            <span>Notification</span>
          </NavLink> */}

          {/* 8. Reports-Analytics */}
          {/* <NavLink
            to="/reports-analytics"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiBarChart2 className="menu-icon" />
            <span>Reports-Analytics</span>
          </NavLink> */}

          {/* 9. Profile */}
          {/* <NavLink
            to="/profile"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiUser className="menu-icon" />
            <span>Profile</span>
          </NavLink> */}

          {/* 10. Administration */}
          {/* <NavLink
            to="/administration"
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <FiShield className="menu-icon" />
            <span>Administration</span>
          </NavLink> */}
        </div>
      </nav>

      {/* Logout Footer */}
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