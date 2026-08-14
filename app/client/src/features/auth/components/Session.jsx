// import React from "react";
import "./Session.css";
import {
  Crown,
  Users,
  ShieldCheck,
  Briefcase,
  User,
  GraduationCap,
} from "lucide-react";

const ROLES = [
  {
    key: "ceo",
    label: "CEO",
    desc: "Overview & business insights",
    icon: Crown,
  },
  {
    key: "hr",
    label: "HR",
    desc: "Manage employees & departments",
    icon: Users,
  },
  {
    key: "admin",
    label: "Admin",
    desc: "System settings & user management",
    icon: ShieldCheck,
  },
  {
    key: "manager",
    label: "Manager",
    desc: "Manage team & track performance",
    icon: Briefcase,
  },
  {
    key: "employee",
    label: "Employee",
    desc: "View tasks & daily activities",
    icon: User,
  },
  {
    key: "intern",
    label: "Intern",
    desc: "Access tasks & learning resources",
    icon: GraduationCap,
  },
];

function Session() {
  return (
    <div className="role-grid">
      {ROLES.map((role) => {
        const Icon = role.icon;

        return (
          <div key={role.key} className="role-card">
            <Icon className="role-icon" size={26} strokeWidth={2} />

            <span className="role-label">{role.label}</span>

            <span className="role-desc">{role.desc}</span>
          </div>
        );
      })}
    </div>
  );
}
export default Session;