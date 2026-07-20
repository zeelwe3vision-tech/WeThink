import { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";

import {
  updateEmployee,
  deleteEmployee,
  getOrganizations,
  getDepartments,
  getRoles,
  getManagers,
} from "../services/employeeService";

import "./EditEmployeeDrawer.css";

function EditEmployeeDrawer({ open, onClose, employee, onRefresh }) {
  /* ===========================================================
     Form State
  =========================================================== */

  const emptyForm = {
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",

    organizationId: "",
    departmentId: "",
    roleId: "",
    managerId: "",

    designation: "",
    joiningDate: "",
    employmentType: "Full Time",

    status: true,
  };

  const [form, setForm] = useState(emptyForm);

  /* ===========================================================
     Dropdown State
  =========================================================== */

  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [managers, setManagers] = useState([]);

  /* ===========================================================
     Populate Employee Data
  =========================================================== */

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setForm(
        employee
          ? {
              employeeId: employee.employee_id || "",
              firstName: employee.first_name || "",
              lastName: employee.last_name || "",
              email: employee.email || "",
              mobile: employee.mobile || "",
              password: "",
              organizationId: employee.organization_id || "",
              departmentId: employee.department_id || "",
              roleId: employee.role_id || "",
              managerId: employee.manager_id || "",
              designation: employee.designation || "",
              joiningDate: employee.joining_date || "",
              employmentType: employee.employment_type || "Full Time",
              status:
                employee.status === true ||
                employee.status === "true" ||
                employee.status === "Active",
            }
          : emptyForm,
      );
    }, 0);

    return () => clearTimeout(timer);
  }, [open, employee]);

  /* ===========================================================
     Load Dropdowns
  =========================================================== */

  useEffect(() => {
    if (!open) return;

    const loadDropdowns = async () => {
      try {
        const orgRes = await getOrganizations();
        const deptRes = await getDepartments();
        const roleRes = await getRoles();
        const managerRes = await getManagers();

        if (orgRes.success) {
          setOrganizations(orgRes.organizations);
        }

        if (deptRes.success) {
          setDepartments(deptRes.departments);
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

  /* ===========================================================
     Generic Input Change
  =========================================================== */

  const handleChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* ===========================================================
     Update Employee
  =========================================================== */

  const handleUpdate = async () => {
    const response = await updateEmployee(employee.id, form);

    if (!response.success) {
      alert(response.message);
      return;
    }

    alert("Employee Updated Successfully");

    if (onRefresh) {
      onRefresh();
    }

    onClose();
  };

  /* ===========================================================
     Delete Employee
  =========================================================== */

  const handleDelete = async () => {
    if (!window.confirm("Delete this employee?")) return;

    const response = await deleteEmployee(employee.id);

    if (!response.success) {
      alert(response.message);
      return;
    }

    alert("Employee Deleted Successfully");

    if (onRefresh) {
      onRefresh();
    }

    onClose();
  };

  if (!open) return null;
  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="edit-employee-drawer">
        {/* ===========================
            Header
        =========================== */}

        <div className="drawer-header">
          <div>
            <h2>Edit Employee</h2>
            <p>Update employee information.</p>
          </div>

          <button className="drawer-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* ===========================
            Body
        =========================== */}

        <div className="drawer-body">
          <div className="drawer-form-group">
            <label>Employee ID</label>
            <input
              type="text"
              value={form.employeeId}
              onChange={(e) => handleChange("employeeId", e.target.value)}
            />
          </div>

          <div className="drawer-form-group">
            <label>First Name</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>

          <div className="drawer-form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>

          <div className="drawer-form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="drawer-form-group">
            <label>Mobile</label>
            <input
              type="text"
              value={form.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
            />
          </div>

          <div className="drawer-form-group">
            <label>Designation</label>
            <input
              type="text"
              value={form.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
            />
          </div>

          <div className="drawer-form-group">
            <label>Organization</label>

            <select
              value={form.organizationId}
              onChange={(e) => handleChange("organizationId", e.target.value)}
            >
              <option value="">Select Organization</option>

              {organizations.map((organization) => (
                <option key={organization.id} value={organization.id}>
                  {organization.organization_name}
                </option>
              ))}
            </select>
          </div>

          <div className="drawer-form-group">
            <label>Department</label>

            <select
              value={form.departmentId}
              onChange={(e) => handleChange("departmentId", e.target.value)}
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>

          <div className="drawer-form-group">
            <label>Role</label>

            <select
              value={form.roleId}
              onChange={(e) => handleChange("roleId", e.target.value)}
            >
              <option value="">Select Role</option>

              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role_name}
                </option>
              ))}
            </select>
          </div>

          <div className="drawer-form-group">
            <label>Reporting Manager</label>

            <select
              value={form.managerId}
              onChange={(e) => handleChange("managerId", e.target.value)}
            >
              <option value="">Select Manager</option>

              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.first_name} {manager.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="drawer-form-group">
            <label>Joining Date</label>

            <input
              type="date"
              value={form.joiningDate}
              onChange={(e) => handleChange("joiningDate", e.target.value)}
            />
          </div>

          <div className="drawer-form-group">
            <label>Employment Type</label>

            <select
              value={form.employmentType}
              onChange={(e) => handleChange("employmentType", e.target.value)}
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Intern</option>
            </select>
          </div>

          <div className="drawer-form-group">
            <label>Status</label>

            <select
              value={String(form.status)}
              onChange={(e) =>
                handleChange("status", e.target.value === "true")
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        {/* ===========================
            Footer
        =========================== */}

        <div className="drawer-footer">
          <button className="drawer-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="drawer-delete-btn" onClick={handleDelete}>
            <Trash2 size={16} />
            Delete Employee
          </button>

          <button className="drawer-save-btn" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default EditEmployeeDrawer;