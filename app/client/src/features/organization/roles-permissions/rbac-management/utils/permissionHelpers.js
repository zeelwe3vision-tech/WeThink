// Chetan - Permission Helper Functions

/* ==========================================================
   Get Enabled Permission Count
========================================================== */

export const getEnabledPermissionCount = (permissions = []) => {
  let count = 0;

  permissions.forEach((module) => {
    Object.keys(module).forEach((key) => {
      if (key !== "module" && key !== "description" && module[key] === true) {
        count++;
      }
    });
  });

  return count;
};

/* ==========================================================
   Get Disabled Permission Count
========================================================== */

export const getDisabledPermissionCount = (permissions = []) => {
  let count = 0;

  permissions.forEach((module) => {
    Object.keys(module).forEach((key) => {
      if (key !== "module" && key !== "description" && module[key] === false) {
        count++;
      }
    });
  });

  return count;
};

/* ==========================================================
   Toggle Entire Module
========================================================== */

export const toggleModulePermissions = (permissions, moduleIndex, value) => {
  return permissions.map((module, index) => {
    if (index !== moduleIndex) return module;

    const updated = { ...module };

    Object.keys(updated).forEach((key) => {
      if (key !== "module" && key !== "description") {
        updated[key] = value;
      }
    });

    return updated;
  });
};

/* ==========================================================
   Toggle Single Permission
========================================================== */

export const togglePermission = (
  permissions,
  moduleIndex,
  permissionKey,
  value,
) => {
  return permissions.map((module, index) => {
    if (index !== moduleIndex) return module;

    return {
      ...module,
      [permissionKey]: value,
    };
  });
};

/* ==========================================================
   Check Module Fully Enabled
========================================================== */

export const isModuleFullyEnabled = (module) => {
  return Object.keys(module)
    .filter((key) => key !== "module" && key !== "description")
    .every((key) => module[key] === true);
};

/* ==========================================================
   Reset Employee Permission
========================================================== */

export const resetPermissionState = (defaultPermissions) => {
  return JSON.parse(JSON.stringify(defaultPermissions));
};

/* ==========================================================
   Clone Permission State
========================================================== */

export const clonePermissionState = (permissionData) => {
  return JSON.parse(JSON.stringify(permissionData));
};

/* ==========================================================
   Get Role Badge Color
========================================================== */

export const getRoleColor = (roleName) => {
  switch (roleName) {
    case "CEO":
      return "#7C3AED";

    case "HR":
      return "#3B82F6";

    case "Admin":
      return "#EC4899";

    case "Manager":
      return "#10B981";

    case "Employee":
      return "#F59E0B";

    case "Intern":
      return "#6B7280";

    default:
      return "#7C3AED";
  }
};

/* ==========================================================
   Format Permission Label
========================================================== */

export const formatPermissionLabel = (permission) => {
  return permission
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
