import "./ModuleList.css";
import {
  LayoutDashboard,
  Building2,
  Users,
  Shield,
  FolderKanban,
  CheckSquare,
  Lightbulb,
  Bell,
  FileText,
  UserCircle,
  Settings,
} from "lucide-react";

const modules = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "organization",
    name: "Organization",
    icon: Building2,
  },
  {
    id: "employees",
    name: "Employees",
    icon: Users,
  },
  {
    id: "roles",
    name: "Roles & Permissions",
    icon: Shield,
  },
  {
    id: "projects",
    name: "Projects",
    icon: FolderKanban,
  },
  {
    id: "tasks",
    name: "Tasks",
    icon: CheckSquare,
  },
  {
    id: "ideas",
    name: "Ideas",
    icon: Lightbulb,
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
  },
  {
    id: "reports",
    name: "Reports",
    icon: FileText,
  },
  {
    id: "profile",
    name: "Profile",
    icon: UserCircle,
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
  },
];

function ModuleList({ selectedModule, onSelectModule }) {
  return (
    <div className="module-list">
      <div className="module-list-title">System Modules</div>

      {modules.map((module) => {
        const Icon = module.icon;

        return (
          <button
            key={module.id}
            className={`module-item ${
              selectedModule === module.id ? "active" : ""
            }`}
            onClick={() => onSelectModule(module.id)}
          >
            <Icon size={18} />

            <span>{module.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ModuleList;