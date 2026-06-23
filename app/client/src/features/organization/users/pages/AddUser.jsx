// Chetan - 22/06/2026 - start 
import { useState } from "react";
import { createUser } from "../services/userService";

function AddUser() {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    role: "Employee",
    department: "",
    reportingManager: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createUser(formData);
      alert(res.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="employeeId"
        placeholder="Employee ID"
        onChange={handleChange}
      />
      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
      />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="mobile" placeholder="Mobile" onChange={handleChange} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
      />
      <input
        name="reportingManager"
        placeholder="Reporting Manager"
        onChange={handleChange}
      />

      <select name="role" onChange={handleChange}>
        <option>Admin</option>
        <option>HR</option>
        <option>Manager</option>
        <option>Employee</option>
      </select>

      <button type="submit">Create User</button>
    </form>
  );
}

export default AddUser;
// Chetan - 22/06/2026 - end
 