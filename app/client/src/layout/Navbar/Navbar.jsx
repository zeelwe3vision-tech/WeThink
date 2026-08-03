import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  // Dynamic user profile initial
  // const token = localStorage.getItem("token") || "";

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const email = user.email || "";

  const userInitial = email ? email.charAt(0).toUpperCase() : "U";
  
  const breadcrumbs = {
    "/dashboard": {
      parent: "Dashboard",
      child: "Overview",
    },

    "/organization/employees": {
      parent: "Organization",
      child: "Employee List",
    },

    "/organization/departments": {
      parent: "Organization",
      child: "Department List",
    },

    "/organization/roles": {
      parent: "Organization",
      child: "Role Management",
    },

    "/organization/rbac": {
      parent: "Organization",
      child: "RBAC Management",
    },

    "/tasks": {
      parent: "Task Management",
      child: "Task List",
    },

    "/attendance": {
      parent: "Attendance",
      child: "Attendance",
    },

    "/leave": {
      parent: "Leave Management",
      child: "Leave",
    },

    "/reports": {
      parent: "Reports",
      child: "Reports",
    },

    "/notifications": {
      parent: "Notifications",
      child: "Notifications",
    },

    "/settings": {
      parent: "Settings",
      child: "Settings",
    },

    "/audit-logs": {
      parent: "Audit Logs",
      child: "Audit Logs",
    },
  };

  const isTaskDetails = location.pathname.startsWith("/tasks/");

  const current = isTaskDetails
    ? {
        parent: "Task Management",
        middle: "Task List",
        child: "Task Details",
      }
    : breadcrumbs[location.pathname] || {
        parent: "",
        middle: "",
        child: "",
      };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="breadcrumb">
          <span className="breadcrumb-link">{current.parent}</span>

          {current.middle && (
            <>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-link">{current.middle}</span>
            </>
          )}

          {current.child && (
            <>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-active">{current.child}</span>
            </>
          )}
        </div>
      </div>

      <div className="navbar-right">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <button className="profile-btn">{userInitial}</button>
      </div>
    </header>
  );
}

export default Navbar;
