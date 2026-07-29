/* ==========================================================
   Format Role Name
========================================================== */

export const formatRoleName = (roleName) => {
  if (!roleName) {
    return "";
  }

  return roleName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/* ==========================================================
   Get Role Status Badge
========================================================== */

export const getRoleStatusClass = (status) => {
  return status ? "status-active" : "status-inactive";
};

/* ==========================================================
   Count Active Roles
========================================================== */

export const countActiveRoles = (roles) => {
  if (!roles || !Array.isArray(roles)) {
    return 0;
  }

  return roles.filter((role) => role.status).length;
};

/* ==========================================================
   Count Inactive Roles
========================================================== */

export const countInactiveRoles = (roles) => {
  if (!roles || !Array.isArray(roles)) {
    return 0;
  }

  return roles.filter((role) => !role.status).length;
};

/* ==========================================================
   Search Roles
========================================================== */

export const searchRoles = (roles, keyword) => {
  if (!roles) {
    return [];
  }

  if (!keyword) {
    return roles;
  }

  return roles.filter(
    (role) =>
      role.role_name?.toLowerCase().includes(keyword.toLowerCase()) ||
      role.role_code?.toLowerCase().includes(keyword.toLowerCase()),
  );
};

/* ==========================================================
   Filter By Status
========================================================== */

export const filterRolesByStatus = (roles, status) => {
  if (!roles) {
    return [];
  }

  if (status === "all") {
    return roles;
  }

  return roles.filter((role) => String(role.status) === status);
};

/* ==========================================================
   Sort Roles
========================================================== */

export const sortRoles = (roles, field = "role_name", direction = "asc") => {
  return [...roles].sort((a, b) => {
    const valueA = a[field] ?? "";
    const valueB = b[field] ?? "";

    if (direction === "asc") {
      return String(valueA).localeCompare(String(valueB));
    }

    return String(valueB).localeCompare(String(valueA));
  });
};

/* ==========================================================
   Clone Role Object
========================================================== */

export const cloneRole = (role) => {
  return JSON.parse(JSON.stringify(role));
};

/* ==========================================================
   Compare Role Changes
========================================================== */

export const hasRoleChanges = (original, updated) => {
  return JSON.stringify(original) !== JSON.stringify(updated);
};

/* ==========================================================
   Generate Role Code
========================================================== */

export const generateRoleCode = (roleName) => {
  if (!roleName) {
    return "";
  }

  return roleName.trim().toUpperCase().replace(/\s+/g, "_");
};

/* ==========================================================
   Validate Role Name
========================================================== */

export const validateRoleName = (roleName, roles = []) => {
  if (!roleName) {
    return false;
  }

  return !roles.some(
    (role) =>
      role.role_name?.trim().toLowerCase() === roleName.trim().toLowerCase(),
  );
};

/* ==========================================================
   Get Total Assigned Users
========================================================== */

export const getAssignedUsers = (role) => {
  return role?.assigned_users || 0;
};

/* ==========================================================
   Get Permission Count
========================================================== */

export const getPermissionCount = (role) => {
  return role?.permission_count || 0;
};
