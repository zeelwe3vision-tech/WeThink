// Chetan - Permission Helpers

/* ==========================================================
   Check Permission
========================================================== */

export const hasPermission = (permissions, module, action) => {
  if (!permissions || !Array.isArray(permissions)) {
    return false;
  }

  const permission = permissions.find((item) => item.module === module);

  if (!permission) {
    return false;
  }

  return Boolean(permission[action]);
};

/* ==========================================================
   Check Module Access
========================================================== */

export const hasModuleAccess = (permissions, module) => {
  if (!permissions || !Array.isArray(permissions)) {
    return false;
  }

  return permissions.some((item) => item.module === module);
};

/* ==========================================================
   Get Permission Badge
========================================================== */

export const getPermissionBadge = (value) => {
  return value ? "permission-active" : "permission-inactive";
};

/* ==========================================================
   Count Granted Permissions
========================================================== */

export const countGrantedPermissions = (permissions) => {
  if (!permissions || !Array.isArray(permissions)) {
    return 0;
  }

  let total = 0;

  permissions.forEach((permission) => {
    ["view", "create", "edit", "delete", "approve", "export"].forEach(
      (action) => {
        if (permission[action]) {
          total++;
        }
      },
    );
  });

  return total;
};

/* ==========================================================
   Count Total Modules
========================================================== */

export const countModules = (permissions) => {
  if (!permissions || !Array.isArray(permissions)) {
    return 0;
  }

  return permissions.length;
};

/* ==========================================================
   Filter Permissions
========================================================== */

export const filterPermissions = (permissions, keyword) => {
  if (!permissions) {
    return [];
  }

  if (!keyword) {
    return permissions;
  }

  return permissions.filter((permission) =>
    permission.module.toLowerCase().includes(keyword.toLowerCase()),
  );
};

/* ==========================================================
   Toggle Permission
========================================================== */

export const togglePermission = (permissions, module, action) => {
  return permissions.map((permission) => {
    if (permission.module !== module) {
      return permission;
    }

    return {
      ...permission,
      [action]: !permission[action],
    };
  });
};

/* ==========================================================
   Enable Full Access
========================================================== */

export const enableFullAccess = (permission) => {
  return {
    ...permission,
    view: true,
    create: true,
    edit: true,
    delete: true,
    approve: true,
    export: true,
  };
};

/* ==========================================================
   Disable All Access
========================================================== */

export const disableAllAccess = (permission) => {
  return {
    ...permission,
    view: false,
    create: false,
    edit: false,
    delete: false,
    approve: false,
    export: false,
  };
};

/* ==========================================================
   Clone Permission Matrix
========================================================== */

export const clonePermissionMatrix = (permissions) => {
  return JSON.parse(JSON.stringify(permissions));
};

/* ==========================================================
   Compare Permission Changes
========================================================== */

export const hasPermissionChanges = (original, updated) => {
  return JSON.stringify(original) !== JSON.stringify(updated);
};

/* ==========================================================
   Sort Modules
========================================================== */

export const sortModules = (permissions) => {
  return [...permissions].sort((a, b) => a.module.localeCompare(b.module));
};
