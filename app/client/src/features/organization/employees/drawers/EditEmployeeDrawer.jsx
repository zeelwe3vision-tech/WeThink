import { X } from "lucide-react";
import "./EditEmployeeDrawer.css";

function EditEmployeeDrawer({ open, onClose, employee }) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div className="drawer-overlay" onClick={onClose} />

      {/* Drawer */}

      <div className="edit-employee-drawer">
        {/* Header */}

        <div className="drawer-header">
          <div>
            <h2>Edit Employee</h2>

            <p>Update employee information.</p>
          </div>

          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="drawer-body">
          <div className="drawer-form-group">
            <label>First Name</label>

            <input type="text" defaultValue={employee?.firstName} />
          </div>

          <div className="drawer-form-group">
            <label>Last Name</label>

            <input type="text" defaultValue={employee?.lastName} />
          </div>

          <div className="drawer-form-group">
            <label>Email</label>

            <input type="email" defaultValue={employee?.email} />
          </div>

          <div className="drawer-form-group">
            <label>Mobile Number</label>

            <input type="text" defaultValue={employee?.mobile} />
          </div>

          <div className="drawer-form-group">
            <label>Department</label>

            <select defaultValue={employee?.department}>
              <option>HR</option>
              <option>Sales</option>
              <option>IT</option>
              <option>Finance</option>
            </select>
          </div>

          <div className="drawer-form-group">
            <label>Role</label>

            <select defaultValue={employee?.role}>
              <option>CEO</option>
              <option>Admin</option>
              <option>HR</option>
              <option>Manager</option>
              <option>Employee</option>
              <option>Intern</option>
            </select>
          </div>

          <div className="drawer-form-group">
            <label>Status</label>

            <select defaultValue={employee?.status}>
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
            </select>
          </div>
        </div>

        {/* Footer */}

        <div className="drawer-footer">
          <button className="drawer-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="drawer-save-btn">Save Changes</button>
        </div>
      </div>
    </>
  );
}

export default EditEmployeeDrawer;
