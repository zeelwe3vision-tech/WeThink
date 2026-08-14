import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  getOrganizations,
  getDepartments,
  getRoles,
  getManagers,
} from "../services/employeeService";

import "./RegisterEmployeeModal.css";

function RegisterEmployeeModal({ open, onClose, onSubmit }) {
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [password, setPassword] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [managers, setManagers] = useState([]);
  const [managerSearch, setManagerSearch] = useState("");
  const [showManagerList, setShowManagerList] = useState(false);

  const [organizationId, setOrganizationId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [managerId, setManagerId] = useState("");

  const [designation, setDesignation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [status, setStatus] = useState(true);

  const resetForm = () => {
    setEmployeeId("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobile("");
    setPassword("");

    setOrganizationId("");
    setDepartmentId("");
    setRoleId("");
    setManagerId("");

    setDesignation("");
    setJoiningDate("");

    setEmploymentType("Full Time");
    setStatus(true);

    setManagerSearch("");
    setShowManagerList(false);
  };

  useEffect(() => {
    if (!open) return;

    // resetForm();

    const loadDropdowns = async () => {
      try {
        const organizationRes = await getOrganizations();
        console.log("Organizations API", organizationRes);
        const managerRes = await getManagers();

        const departmentRes = await getDepartments();
        const roleRes = await getRoles();

        if (organizationRes.success) {
          console.log(organizationRes.organizations);
          setOrganizations(organizationRes.organizations);
        }

        if (departmentRes.success) {
          console.log(departmentRes.departments);
          setDepartments(departmentRes.departments);
        }

        if (roleRes.success) {
          setRoles(roleRes.roles);
        }
        if (managerRes.success) {
          setManagers(managerRes.managers);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadDropdowns();
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      employeeId,
      firstName,
      lastName,
      email,
      mobile,
      password,

      organizationId,
      departmentId,
      roleId,
      managerId,

      designation,
      joiningDate,
      employmentType,
      status,
    };

    const success = await onSubmit(employeeData);

    if (success) {
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={handleClose} />

      {/* Modal */}
      <div className="register-modal">
        {/* Header */}
        <div className="register-modal-header">
          <div className="header-content">
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
              <input
                type="text"
                placeholder="EMP0001"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Mobile</label>

              <input
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");

                  if (value.length <= 10) {
                    setMobile(value);

                    if (value === "" || /^[6-9]\d{9}$/.test(value)) {
                      setMobileError("");
                    } else {
                      setMobileError(
                        "Mobile number must be exactly 10 digits.",
                      );
                    }
                  }
                }}
              />

              {mobileError && <span className="form-error">{mobileError}</span>}
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Organization</label>
              <select
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
              >
                <option value="">Select Organization</option>

                {organizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>
                    {organization.organization_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option value="">Select Department</option>

                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                <option value="">Select Role</option>

                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>

            <div className="form-group manager-search">
              <label>Reporting Manager</label>

              <input
                type="text"
                placeholder="Search Manager"
                value={managerSearch}
                onChange={(e) => {
                  setManagerSearch(e.target.value);
                  setShowManagerList(true);
                }}
              />

              {showManagerList && managerSearch && (
                <div className="manager-dropdown">
                  {managers
                    .filter((manager) =>
                      `${manager.first_name} ${manager.last_name}`
                        .toLowerCase()
                        .includes(managerSearch.toLowerCase()),
                    )
                    .map((manager) => (
                      <div
                        key={manager.id}
                        className="manager-item"
                        onClick={() => {
                          setManagerSearch(
                            `${manager.first_name} ${manager.last_name}`,
                          );
                          setManagerId(manager.id);
                          setShowManagerList(false);
                        }}
                      >
                        <strong>
                          {manager.first_name} {manager.last_name}
                        </strong>
                        <br />
                        <small>{manager.designation}</small>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Joining Date</label>
              <input
                type="date"
                value={joiningDate}
                min={new Date().toLocaleDateString("en-CA")}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Intern</option>
                <option>Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value === "true")}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer */}

          <div className="register-modal-footer">
            <button type="button" className="cancel-btn" onClick={handleClose}>
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
