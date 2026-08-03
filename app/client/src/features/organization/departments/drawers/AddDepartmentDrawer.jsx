import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/AddDepartmentDrawer.css";

function AddDepartmentDrawer({
  open,
  onClose,
  onSubmit,
  editDepartment,
}) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
  if (editDepartment) {
    setFormData({
      name: editDepartment.name,
      department: editDepartment.department,
      role: editDepartment.role,
      status: editDepartment.status,
    });
  } else {
    setFormData({
      name: "Web Development Team",
      department: "Web Development",
      role: "Senior Developer",
      status: "Active",
    });
  }
}, [editDepartment]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.department === "" ||
      formData.role === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    onSubmit(formData);

    alert(
      editDepartment
        ? "Department Updated Successfully"
        : "Department Created Successfully"
    );

    onClose();
  };

  return (
    <div className="drawer-overlay">
      <div className="drawer-panel">

        <div className="drawer-header">

          <h2>
            {editDepartment
              ? "Edit Department"
              : "Create Department"}
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <label>Name</label>

          <input
            type="text"
            name="name"
            placeholder="Example : Dev"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Department */}

          <label>Department Name</label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">
              Select Department
            </option>

            <option>
              Web Development
            </option>

            <option>
              MERN-Stack
            </option>

            <option>
              Full-Stack
            </option>

            <option>
              AI / ML
            </option>

            <option>
              Sales
            </option>

            <option>
              UI / UX Design
            </option>

            <option>
              MEAN-Stack
            </option>

          </select>

          {/* Role */}

          <label>Role</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">
              Select Role
            </option>
            <option>Senior Developer</option>

            <option>Junior Developer</option>

            <option>Manager</option>

            <option>Team Lead</option>

            <option>Employee</option>

            <option>Intern</option>

          </select>

          {/* Status */}

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>

            <option>Inactive</option>

          </select>

          <div className="button-group">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
            >
              {editDepartment
                ? "Update"
                : "Submit"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
export default AddDepartmentDrawer;