// Chetan - RBAC Permission Service

import axios from "axios";

/* ==========================================================
   API Configuration
========================================================== */

// const API = "http://localhost:5000/api";

const API = "https://wethink.onrender.com/api";


const RBAC_API = `${API}/rbac`;

const USER_API = `${API}/users`;

const ROLE_API = `${API}/roles`;

/* ==========================================================
   Get Employees
========================================================== */

export const getEmployees = async () => {
  const response = await axios.get(`${USER_API}`);

  return response.data;
};

/* ==========================================================
   Get Employee Permissions
========================================================== */

export const getEmployeePermissions = async (employeeId) => {
  const response = await axios.get(`${RBAC_API}/employee/${employeeId}`);

  return response.data;
};

/* ==========================================================
   Save Employee Permissions
========================================================== */

export const saveEmployeePermissions = async (employeeId, permissionData) => {
  const response = await axios.put(
    `${RBAC_API}/employee/${employeeId}`,
    permissionData,
  );

  return response.data;
};

/* ==========================================================
   Clone Permission
========================================================== */

export const clonePermissions = async (employeeId, cloneData) => {
  const response = await axios.post(
    `${RBAC_API}/employee/${employeeId}/clone`,
    cloneData,
  );

  return response.data;
};
/* ==========================================================
   Reset Employee Permissions
========================================================== */

export const resetPermissions = async (
  employeeId
) => {
  const response = await axios.put(
    `${RBAC_API}/employee/${employeeId}/reset`
  );

  return response.data;
};

/* ==========================================================
   Get Role Default Permissions
========================================================== */

export const getRolePermissions = async (
  roleId
) => {
  const response = await axios.get(
    `${ROLE_API}/${roleId}/permissions`
  );

  return response.data;
};

/* ==========================================================
   Update Role Default Permissions
========================================================== */

export const updateRolePermissions = async (
  roleId,
  permissionData
) => {
  const response = await axios.put(
    `${ROLE_API}/${roleId}/permissions`,
    permissionData
  );

  return response.data;
};

/* ==========================================================
   Get Permission Matrix
========================================================== */

export const getPermissionMatrix = async () => {
  const response = await axios.get(
    `${RBAC_API}/matrix`
  );

  return response.data;
};

/* ==========================================================
   Save Permission Matrix
========================================================== */

export const savePermissionMatrix = async (
  matrixData
) => {
  const response = await axios.put(
    `${RBAC_API}/matrix`,
    matrixData
  );

  return response.data;
};

/* ==========================================================
   Get Permission Summary
========================================================== */

export const getPermissionSummary = async (
  employeeId
) => {
  const response = await axios.get(
    `${RBAC_API}/employee/${employeeId}/summary`
  );

  return response.data;
};  