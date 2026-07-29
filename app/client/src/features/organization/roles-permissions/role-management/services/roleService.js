// Chetan - Role Service

import axios from "axios";

/* ==========================================================
   API Configuration
========================================================== */

// const API = "https://wethink.onrender.com/api";
const API = "http://localhost:5000/api";

const ROLE_API = `${API}/roles`;

/* ==========================================================
   Get All Roles
========================================================== */

export const getRoles = async () => {
  const response = await axios.get(ROLE_API);
  return response.data;
};

/* ==========================================================
   Get Role By ID
========================================================== */

export const getRoleById = async (id) => {
  const response = await axios.get(`${ROLE_API}/${id}`);
  return response.data;
};

/* ==========================================================
   Create Role
========================================================== */

export const createRole = async (roleData) => {
  const response = await axios.post(ROLE_API, roleData);
  return response.data;
};

/* ==========================================================
   Update Role
========================================================== */

export const updateRole = async (id, roleData) => {
  const response = await axios.put(`${ROLE_API}/${id}`, roleData);

  return response.data;
};

/* ==========================================================
   Delete Role
========================================================== */

export const deleteRole = async (id) => {
  const response = await axios.delete(`${ROLE_API}/${id}`);
  return response.data;
};

/* ==========================================================
   Clone Role
========================================================== */

export const cloneRole = async (id, roleData) => {
  try {
    const response = await axios.post(
      `${ROLE_API}/${id}/clone`,
      roleData
    );

    return response.data;

  } catch (error) {
    console.error("Clone Role Error:", error);

    throw error;
  }
};

/* ==========================================================
   Assign Role
========================================================== */

export const assignRole = async (employeeId, roleId) => {
  const response = await axios.put(`${API}/users/${employeeId}/role`, {
    role_id: roleId,
  });

  return response.data;
};

/* ==========================================================
   Get Role Statistics
========================================================== */

export const getRoleStats = async () => {
  const response = await axios.get(`${ROLE_API}/stats`);
  return response.data;
};