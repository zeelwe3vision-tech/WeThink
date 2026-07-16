import { X } from "lucide-react";
import "./RegisterEmployeeModal.css";

function RegisterEmployeeModal({ open, onClose, onSubmit }) {
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <>
      {/* Overlay */}

      <div className="modal-overlay" onClick={onClose} />

      {/* Modal */}

      <div className="register-modal">
        {/* Header */}

        <div className="register-modal-header">
          <div>
            <h2>Register Employee</h2>

            <p>Enter employee details to create a new account.</p>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-grid">
            <div className="form-group">
              <label>Employee ID</label>
              <input type="text" placeholder="EMP0001" />
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="First Name" />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Email Address" />
            </div>

            <div className="form-group">
              <label>Mobile</label>
              <input type="text" placeholder="Mobile Number" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Password" />
            </div>

            <div className="form-group">
              <label>Department</label>

              <select>
                <option>HR</option>
                <option>IT</option>
                <option>Finance</option>
                <option>Sales</option>
              </select>
            </div>

            <div className="form-group">
              <label>Role</label>

              <select>
                <option>CEO</option>
                <option>Admin</option>
                <option>HR</option>
                <option>Manager</option>
                <option>Employee</option>
                <option>Intern</option>
              </select>
            </div>

            <div className="form-group">
              <label>Reporting Manager</label>

              <input type="text" placeholder="Reporting Manager" />
            </div>

            <div className="form-group">
              <label>Status</label>

              <select>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer */}

          <div className="register-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="register-btn">
              Register Employee
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterEmployeeModal;
