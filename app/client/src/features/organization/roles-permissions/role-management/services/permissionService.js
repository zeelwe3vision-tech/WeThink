// Chetan - Permission Service

import axios from "axios";

/* ==========================================================
   API Configuration
========================================================== */

const API = "https://wethink.onrender.com/api";
// const API = "http://localhost:5000/api";

const PERMISSION_API = `${API}/permissions`;
const ROLE_API = `${API}/roles`;
const USER_API = `${API}/users`;

/* ==========================================================
   Get All Permissions
========================================================== */

export const getPermissions = async () => {
  const response = await axios.get(PERMISSION_API);
  return response.data;
};

/* ==========================================================
   Get Permission By Role
========================================================== */

export const getRolePermissions = async (roleId) => {
  const response = await axios.get(`${ROLE_API}/${roleId}/permissions`);
  return response.data;
};

/* ==========================================================
   Update Role Permissions
========================================================== */

export const updateRolePermissions = async (roleId, permissionData) => {
  const response = await axios.put(
    `${ROLE_API}/${roleId}/permissions`,
    permissionData,
  );

  return response.data;
};

/* ==========================================================
   Get User Permissions
========================================================== */

export const getUserPermissions = async (userId) => {
  const response = await axios.get(`${USER_API}/${userId}/permissions`);

  return response.data;
};

/* ==========================================================
   Update User Permissions
========================================================== */

export const updateUserPermissions = async (userId, permissionData) => {
  const response = await axios.put(
    `${USER_API}/${userId}/permissions`,
    permissionData,
  );

  return response.data;
};

/* ==========================================================
   Reset User Permissions
========================================================== */

export const resetUserPermissions = async (userId) => {
  const response = await axios.put(`${USER_API}/${userId}/permissions/reset`);

  return response.data;
};

/* ==========================================================
   Copy Permissions
========================================================== */

export const copyPermissions = async (sourceRoleId, targetRoleId) => {
  const response = await axios.post(`${ROLE_API}/copy-permissions`, {
    source_role_id: sourceRoleId,
    target_role_id: targetRoleId,
  });

  return response.data;
};

/* ==========================================================
   Get Permission Matrix
========================================================== */

export const getPermissionMatrix = async () => {
  const response = await axios.get(`${PERMISSION_API}/matrix`);

  return response.data;
};

/* ==========================================================
   Save Permission Matrix
========================================================== */

export const savePermissionMatrix = async (matrixData) => {
  const response = await axios.put(`${PERMISSION_API}/matrix`, matrixData);

  return response.data;
};