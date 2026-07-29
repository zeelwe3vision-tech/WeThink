// Chetan - Role Details Drawer

import { useState } from "react";
import "./RoleDetailsDrawer.css";

import {
  X,
  Shield,
  Users,
  Building2,
  LayoutDashboard,
  Calendar,
  Activity,
  CheckCircle2,
  XCircle,
  Globe,
  Smartphone,
  Server,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function RoleDetailsDrawer({ open, role, onClose }) {
  const [showPermissions, setShowPermissions] = useState(true);
  const [showUsers, setShowUsers] = useState(true);

  if (!open) return null;

  return (
    <>
      <div className="role-details-backdrop" onClick={onClose} />

      <div className="role-details-drawer">
        {/* ======================================================
            Header
        ======================================================= */}

        <div className="role-details-header">
          <div className="role-details-title">
            <div className="role-icon">
              <Shield size={22} />
            </div>

            <div>
              <h2>{role?.role_name}</h2>

              <p>Role Details & Permission Overview</p>
            </div>
          </div>

          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* ======================================================
            Body
        ======================================================= */}

        <div className="role-details-body">
          {/* ===========================================
              Basic Information
          ============================================ */}

          <div className="role-info-card">
            <div className="drawer-section-title">
              <Shield size={18} />
              Basic Information
            </div>

            <div className="role-info-grid">
              <div className="info-item">
                <span>Role Name</span>

                <strong>{role?.role_name}</strong>
              </div>

              <div className="info-item">
                <span>Role Code</span>

                <strong>{role?.role_code}</strong>
              </div>

              <div className="info-item">
                <span>Hierarchy</span>

                <strong>Level {role?.hierarchy_level}</strong>
              </div>

              <div className="info-item">
                <span>Status</span>

                <strong
                  className={role?.status ? "status-active" : "status-inactive"}
                >
                  {role?.status ? (
                    <>
                      <CheckCircle2 size={15} />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle size={15} />
                      Inactive
                    </>
                  )}
                </strong>
              </div>

              <div className="info-item">
                <span>
                  <LayoutDashboard size={15} />
                  Dashboard
                </span>

                <strong>{role?.dashboard || "-"}</strong>
              </div>

              <div className="info-item">
                <span>
                  <Users size={15} />
                  Assigned Users
                </span>

                <strong>{role?.total_members || 0} Employees</strong>
              </div>

              <div className="info-item">
                <span>
                  <Building2 size={15} />
                  Departments
                </span>

                <strong>{role?.department_count || 0} Departments</strong>
              </div>

              <div className="info-item">
                <span>
                  <Calendar size={15} />
                  Created
                </span>

                <strong>
                  {role?.created_at
                    ? new Date(role.created_at).toLocaleDateString()
                    : "-"}
                </strong>
              </div>
            </div>
          </div>

          {/* ===========================================
              Access Channels
          ============================================ */}

          <div className="role-info-card">
            <div className="drawer-section-title">
              <Activity size={18} />
              Access Channels
            </div>

            <div className="access-channel-list">
              <div className="channel-card">
                <Globe size={20} />

                <span>Web Portal</span>
              </div>

              <div className="channel-card">
                <Smartphone size={20} />

                <span>Mobile App</span>
              </div>

              <div className="channel-card">
                <Server size={20} />

                <span>REST API</span>
              </div>
            </div>
          </div>
          {/* ===========================================
              Permission Summary
          ============================================ */}

          <div className="role-info-card">
            <div
              className="drawer-section-collapse"
              onClick={() => setShowPermissions(!showPermissions)}
            >
              <div className="drawer-section-title">
                <Shield size={18} />
                Permission Summary
              </div>

              {showPermissions ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {showPermissions && (
              <div className="permission-summary">
                <div className="permission-item">
                  <span>Dashboard</span>

                  <strong>View, Edit</strong>
                </div>

                <div className="permission-item">
                  <span>Organization</span>

                  <strong>Full Access</strong>
                </div>

                <div className="permission-item">
                  <span>Employees</span>

                  <strong>Create, Edit, Delete</strong>
                </div>

                <div className="permission-item">
                  <span>Projects</span>

                  <strong>View, Assign</strong>
                </div>

                <div className="permission-item">
                  <span>Tasks</span>

                  <strong>Full Access</strong>
                </div>

                <div className="permission-item">
                  <span>Reports</span>

                  <strong>View</strong>
                </div>
              </div>
            )}
          </div>

          {/* ===========================================
              Assigned Employees
          ============================================ */}

          <div className="role-info-card">
            <div
              className="drawer-section-collapse"
              onClick={() => setShowUsers(!showUsers)}
            >
              <div className="drawer-section-title">
                <Users size={18} />
                Assigned Employees
              </div>

              {showUsers ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {showUsers && (
              <div className="assigned-user-list">
                <div className="assigned-user">
                  <div className="user-avatar">CJ</div>

                  <div>
                    <strong>Chetan Jain</strong>

                    <span>CEO</span>
                  </div>
                </div>

                <div className="assigned-user">
                  <div className="user-avatar">RK</div>

                  <div>
                    <strong>Rahul Kumar</strong>

                    <span>HR Manager</span>
                  </div>
                </div>

                <div className="assigned-user">
                  <div className="user-avatar">AS</div>

                  <div>
                    <strong>Anjali Shah</strong>

                    <span>Operations Manager</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ===========================================
              Activity Timeline
          ============================================ */}

          <div className="role-info-card">
            <div className="drawer-section-title">
              <Activity size={18} />
              Recent Activity
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-dot"></span>

                <div>
                  <strong>Role Updated</strong>

                  <p>Permissions modified by Admin</p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot"></span>

                <div>
                  <strong>User Assigned</strong>

                  <p>Rahul Kumar assigned to this role</p>
                </div>
              </div>

              <div className="activity-item">
                <span className="activity-dot"></span>

                <div>
                  <strong>Role Created</strong>

                  <p>Initial role created by Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            Footer
        ======================================================= */}

        <div className="role-details-footer">
          <button className="drawer-cancel-btn" onClick={onClose}>
            Close
          </button>

          <button className="drawer-edit-btn">Edit Role</button>
        </div>
      </div>
    </>
  );
}
export default RoleDetailsDrawer;