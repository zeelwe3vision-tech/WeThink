import {
  FiHome,
  FiBriefcase,
  FiClipboard,
  FiCalendar,
  FiFileText,
  FiBell,
  FiSettings,
  FiShield,
  FiLogOut,
} from "react-icons/fi";

const sidebarMenu = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: FiHome,
    path: "/dashboard",
  },

  {
    id: "organization",
    title: "Organization",
    icon: FiBriefcase,
    children: [
      {
        id: "employee-info",
        title: "Employee Info",
        path: "/organization/employees",
      },
      {
        id: "department-list",
        title: "Department List",
        path: "/organization/departments",
      },
      {
        id: "roles-permissions",
        title: "Roles & Permissions",
        path: "/organization/roles",
      },
    ],
  },

  {
    id: "tasks",
    title: "Task Management",
    icon: FiClipboard,
    path: "/tasks",
  },

  {
    id: "attendance",
    title: "Attendance",
    icon: FiCalendar,
    path: "/attendance",
  },

  {
    id: "leave",
    title: "Leave",
    icon: FiFileText,
    path: "/leave",
  },

  {
    id: "reports",
    title: "Reports",
    icon: FiFileText,
    path: "/reports",
  },

  {
    id: "notifications",
    title: "Notifications",
    icon: FiBell,
    path: "/notifications",
  },

  {
    id: "settings",
    title: "Settings",
    icon: FiSettings,
    path: "/settings",
  },

  {
    id: "audit-logs",
    title: "Audit Logs",
    icon: FiShield,
    path: "/audit-logs",
  },
];

export const logoutMenu = {
  id: "logout",
  title: "Logout",
  icon: FiLogOut,
  path: "/logout",
};

export default sidebarMenu;