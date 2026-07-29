import { useState } from "react";
import "./UserPermissionDrawer.css";

import {
  X,
  User,
  Shield,
  Mail,
  Phone,
  Building2,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lock,
} from "lucide-react";

function UserPermissionDrawer({ open, employee, onClose }) {
  const [showPermissions, setShowPermissions] = useState(true);
  const [showAccess, setShowAccess] = useState(true);

  if (!open) return null;

  return (
    <>
      <div className="user-permission-backdrop" onClick={onClose} />

      <div className="user-permission-drawer">
        {/* ======================================================
            Header
        ====================================================== */}

        <div className="user-permission-header">
          <div className="user-permission-title">
            <div className="user-avatar-icon">
              <User size={22} />
            </div>

            <div>
              <h2>User Permission Details</h2>

              <p>Employee Information & Permission Overview</p>
            </div>
          </div>

          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* ======================================================
            Body
        ====================================================== */}

        <div className="user-permission-body">
          {/* ===========================================
              Employee Information
          ============================================ */}

          <div className="permission-card">
            <div className="drawer-section-title">
              <User size={18} />
              Employee Information
            </div>

            <div className="employee-profile">
              <div className="employee-avatar">
                {employee?.full_name?.charAt(0)}
              </div>

              <div>
                <h3>{employee?.full_name}</h3>

                <span>{employee?.designation}</span>
              </div>
            </div>

            <div className="employee-grid">
              <div className="employee-item">
                <span>
                  <Mail size={15} />
                  Email
                </span>

                <strong>{employee?.email}</strong>
              </div>

              <div className="employee-item">
                <span>
                  <Phone size={15} />
                  Mobile
                </span>

                <strong>{employee?.mobile}</strong>
              </div>

              <div className="employee-item">
                <span>
                  <Building2 size={15} />
                  Department
                </span>

                <strong>{employee?.department}</strong>
              </div>

              <div className="employee-item">
                <span>
                  <Briefcase size={15} />
                  Designation
                </span>

                <strong>{employee?.designation}</strong>
              </div>
            </div>
          </div>

          {/* ===========================================
              Current Role
          ============================================ */}

          <div className="permission-card">
            <div className="drawer-section-title">
              <Shield size={18} />
              Assigned Role
            </div>

            <div className="role-summary">
              <div>
                <strong>{employee?.role}</strong>

                <span>Current Assigned Role</span>
              </div>

              <div className="role-status">
                <CheckCircle2 size={16} />
                Active
              </div>
            </div>
          </div>

          {/* ===========================================
              Permission Summary
          ============================================ */}

          <div className="permission-card">
            <div
              className="drawer-section-collapse"
              onClick={() => setShowPermissions(!showPermissions)}
            >
              <div className="drawer-section-title">
                <Lock size={18} />
                Permission Summary
              </div>

              {showPermissions ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {showPermissions && (
              <div className="permission-list">
                <div className="permission-row">
                  <span>Dashboard</span>

                  <strong>View</strong>
                </div>

                <div className="permission-row">
                  <span>Employees</span>

                  <strong>Create, Edit</strong>
                </div>

                <div className="permission-row">
                  <span>Projects</span>

                  <strong>Full Access</strong>
                </div>

                <div className="permission-row">
                  <span>Tasks</span>

                  <strong>Assign</strong>
                </div>

                <div className="permission-row">
                  <span>Reports</span>

                  <strong>View</strong>
                </div>
              </div>
            )}
          </div>
          {/* ===========================================
              Access Rights
          ============================================ */}

          <div className="permission-card">
            <div
              className="drawer-section-collapse"
              onClick={() => setShowAccess(!showAccess)}
            >
              <div className="drawer-section-title">
                <Shield size={18} />
                Access Rights
              </div>

              {showAccess ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {showAccess && (
              <div className="access-rights-grid">
                <div className="access-item active">Dashboard</div>

                <div className="access-item active">Organization</div>

                <div className="access-item active">Employees</div>

                <div className="access-item active">Projects</div>

                <div className="access-item active">Tasks</div>

                <div className="access-item">Reports</div>

                <div className="access-item">Administration</div>

                <div className="access-item">Settings</div>
              </div>
            )}
          </div>

          {/* ===========================================
              Login Information
          ============================================ */}

          <div className="permission-card">
            <div className="drawer-section-title">
              <User size={18} />
              Login Information
            </div>

            <div className="employee-grid">
              <div className="employee-item">
                <span>Last Login</span>

                <strong>22 Jul 2026, 09:45 AM</strong>
              </div>

              <div className="employee-item">
                <span>Email Verified</span>

                <strong className="status-success">
                  <CheckCircle2 size={15} />
                  Verified
                </strong>
              </div>

              <div className="employee-item">
                <span>Account Status</span>

                <strong className="status-success">
                  <CheckCircle2 size={15} />
                  Active
                </strong>
              </div>

              <div className="employee-item">
                <span>Failed Login</span>

                <strong>0 Attempts</strong>
              </div>
            </div>
          </div>

          {/* ===========================================
              Audit Information
          ============================================ */}

          <div className="permission-card">
            <div className="drawer-section-title">
              <Shield size={18} />
              Audit Information
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-dot"></span>

                <div>
                  <strong>Permission Updated</strong>

                  <p>RBAC permissions modified by Super Admin</p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot"></span>

                <div>
                  <strong>Role Assigned</strong>

                  <p>Employee assigned to CEO role</p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot"></span>

                <div>
                  <strong>Account Created</strong>

                  <p>Employee account registered successfully</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            Footer
        ====================================================== */}

        <div className="user-permission-footer">
          <button className="drawer-cancel-btn" onClick={onClose}>
            Close
          </button>

          <button className="drawer-edit-btn">Manage Permissions</button>
        </div>
      </div>
    </>
  );
}

export default UserPermissionDrawer;