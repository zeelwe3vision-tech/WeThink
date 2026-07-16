import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  UserCheck,
  CalendarDays,
  Briefcase,
  MoreVertical,
} from "lucide-react";

import EmployeeActions from "../components/EmployeeActions";

import EditEmployeeDrawer from "../drawers/EditEmployeeDrawer";

import AssignSkillsModal from "../modals/AssignSkillsModal";

import DeleteEmployeePopup from "../popups/DeleteEmployeePopup";

import "./EmployeeDetails.css";

function EmployeeDetails() {
  /* ==========================================================
      Employee Data
  ========================================================== */

  const [employee] = useState({
    id: 1,
    employeeId: "EMP001",

    firstName: "Chetan",
    lastName: "Jain",

    email: "chetan@wethink.com",
    mobile: "+91 9876543210",

    department: "Information Technology",

    role: "Admin",

    manager: "Rahul Sharma",

    joiningDate: "15 January 2026",

    status: "Active",

    skills: ["React", "Node.js", "Express", "Supabase", "PostgreSQL", "Git"],
  });

  /* ==========================================================
      Drawer & Modals
  ========================================================== */

  const [showDrawer, setShowDrawer] = useState(false);

  const [showSkillModal, setShowSkillModal] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const closeAll = () => {
    setShowDrawer(false);
    setShowSkillModal(false);
    setShowDeletePopup(false);
  };

  return (
    <div className="employee-details-page">
      {/* ==========================================
          Breadcrumb
      ========================================== */}

      <div className="employee-details-breadcrumb">
        <span>Organization</span>

        <span className="breadcrumb-divider">&gt;</span>

        <span>Employee Info</span>

        <span className="breadcrumb-divider">&gt;</span>

        <span className="breadcrumb-active">Employee Details</span>
      </div>

      {/* ==========================================
          Back Button
      ========================================== */}

      <button className="back-button">
        <ArrowLeft size={18} />
        Back to Employee List
      </button>

      {/* ==========================================
          Profile Card
      ========================================== */}

      <div className="employee-profile-card">
        <div className="employee-profile-left">
          <div className="employee-profile-avatar">
            {employee.firstName.charAt(0)}
            {employee.lastName.charAt(0)}
          </div>

          <div>
            <h2>
              {employee.firstName} {employee.lastName}
            </h2>

            <p>{employee.employeeId}</p>

            <span className="employee-status active">{employee.status}</span>
          </div>
        </div>

        <div className="employee-profile-right">
          <EmployeeActions
            employee={employee}
            icon={<MoreVertical size={18} />}
            onEdit={() => setShowDrawer(true)}
            onAssignSkills={() => setShowSkillModal(true)}
            onDelete={() => setShowDeletePopup(true)}
          />
        </div>
      </div>

      {/* ==========================================
          Details Grid
      ========================================== */}

      <div className="employee-details-grid">
        {/* Basic Information */}

        <div className="details-card">
          <h3>Basic Information</h3>

          <div className="details-item">
            <Mail size={18} />

            <div>
              <label>Email</label>

              <p>{employee.email}</p>
            </div>
          </div>

          <div className="details-item">
            <Phone size={18} />

            <div>
              <label>Mobile</label>

              <p>{employee.mobile}</p>
            </div>
          </div>

          <div className="details-item">
            <CalendarDays size={18} />

            <div>
              <label>Joining Date</label>

              <p>{employee.joiningDate}</p>
            </div>
          </div>
        </div>

        {/* Professional Information */}

        <div className="details-card">
          <h3>Professional Information</h3>

          <div className="details-item">
            <Building2 size={18} />

            <div>
              <label>Department</label>

              <p>{employee.department}</p>
            </div>
          </div>

          <div className="details-item">
            <ShieldCheck size={18} />

            <div>
              <label>Role</label>

              <p>{employee.role}</p>
            </div>
          </div>

          <div className="details-item">
            <UserCheck size={18} />

            <div>
              <label>Reporting Manager</label>

              <p>{employee.manager}</p>
            </div>
          </div>
        </div>
        {/* Skills */}

        <div className="details-card">
          <h3>Assigned Skills</h3>

          <div className="employee-skills">
            {employee.skills.map((skill) => (
              <span key={skill} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}

        <div className="details-card">
          <h3>Recent Activity</h3>

          <div className="activity-item">
            <Briefcase size={18} />

            <div>
              <label>Last Login</label>

              <p>13 July 2026 • 12:18 PM</p>
            </div>
          </div>

          <div className="activity-item">
            <Briefcase size={18} />

            <div>
              <label>Last Updated</label>

              <p>12 July 2026 • 05:42 PM</p>
            </div>
          </div>

          <div className="activity-item">
            <Briefcase size={18} />

            <div>
              <label>Current Status</label>

              <p>Working</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          Drawer & Modals
      ========================================== */}

      <EditEmployeeDrawer
        open={showDrawer}
        employee={employee}
        onClose={closeAll}
      />

      <AssignSkillsModal
        open={showSkillModal}
        employee={employee}
        onClose={closeAll}
        onSave={closeAll}
      />

      <DeleteEmployeePopup
        open={showDeletePopup}
        employee={employee}
        onClose={closeAll}
        onDelete={() => {
          closeAll();

          console.log("Employee Deleted:", employee.id);
        }}
      />
    </div>
  );
}

export default EmployeeDetails;